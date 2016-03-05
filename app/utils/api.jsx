var request = require('superagent');
var AuthStore = require('../stores/auth-store');

var config = require('../utils/config');

var API = {
    getAuthToken: function(code) {
        var promise = new Promise(function(resolve, reject) {
            request
                .post(config.rootUrl + 'oauth/token')
                .send({
                    "client_id": config.clientId,
                    "client_secret": config.clientSecret,
                    "redirect_uri": "http://localhost:3000/",
                    "code": code,
                    "grant_type": "authorization_code"
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
                .end(function(err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
        return promise.then(function(res) {
                return res.body
            })
            .then(function(data) {
                return data;
            })
            .catch(function(error) {
                console.log('request failed', error)
            });
    },
    getClientOnlyAuthToken: function() {

        var promise = new Promise(function(resolve, reject) {
            request
                .post(config.rootUrl + 'oauth/token')
                .send({
                    "client_id": config.clientId,
                    "client_secret": config.clientSecret,
                    "grant_type": "client_credentials"
                })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
                .end(function(err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
        return promise.then(function(res) {
                return res.body
            })
            .then(function(data) {
                var token = data.access_token;
                AuthStore.updateClientToken(token);
                return token;
            })
            .catch(function(error) {
                console.log('request failed', error)
            });
    },
    getToken: function() {
        var token = AuthStore.getToken();
        if (token) {
            return Promise.resolve(token);
        } else {
            return this.getClientOnlyAuthToken()
        }
    },
    get: function(url) {
        var self = this;
        return this.getToken()
            .then(function(accessToken) {
                var promise = new Promise(function(resolve, reject) {
                    request
                        .get(config.rootUrl + url)
                        .set('Authorization', 'Bearer ' + accessToken)
                        .set('Accept', 'application/json')
                        .set('Content-Type', 'application/json')
                        .end(function(err, res) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(res);
                            }
                        });
                });

                return promise.then(function(res) {
                        return res.body;
                    })
                    .catch(function(error) {
                        AuthStore.removeClientToken();
                        AuthStore.removeAuthToken();
                        console.log('[Request Failed] ', error)
                        return self.get(url);
                    });

            })
            .catch(function(error) {
                console.log('[ERROR] ', error)
            });
    }
};

module.exports = API;