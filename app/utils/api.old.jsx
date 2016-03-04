var Fetch = require('whatwg-fetch');
var AuthStore = require('../stores/auth-store');

var config = require('../utils/config');

var API = {
    getAuthToken: function(code) {
        return fetch(config.rootUrl + 'oauth/token', {
                mode: 'no-cors',
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify({
                    "client_id": config.clientId,
                    "client_secret": config.clientSecret,
                    "redirect_uri": "http://localhost:3000/",
                    "code": code,
                    "grant_type": "authorization_code"
                })
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                return data;
            })
            .catch(function(error) {
                console.log('request failed', error)
                    // return error;
            });
    },
    getClientOnlyAuthToken: function() {
        return fetch(config.rootUrl + 'oauth/token', {
                mode: 'no-cors',
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify({
                    "client_id": config.clientId,
                    "client_secret": config.clientSecret,
                    "grant_type": "client_credentials"
                })
            })
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                var token = data.access_token;
                AuthStore.updateClientToken(token);
                return token;
            })
            .catch(function(error) {
                console.log('request failed', error)
                    // return error;
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
         return this.getToken()
            .then(function(accessToken) {
                return fetch(config.rootUrl + url, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + accessToken,
                            'Host': 'api.producthunt.com',
                            'Cache-Control': 'no-cache'
                        }
                    }); 
            })                  
            .then(function(response) {
                return response.json()
            })
            .catch(function(error) {
                console.log('[Request Failed] ', error)
            });
    }
};

module.exports = API;