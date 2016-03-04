var Reflux = require('reflux');
var AuthActions = require('../actions/auth-actions');

module.exports = Reflux.createStore({
    listenables: [AuthActions],
    init: function() {
        this._state = {
            authToken: window.localStorage.getItem('authtoken') || null,
            clientToken: window.localStorage.getItem('clientauthtoken') || null
        }
    },
    authToken: function() {
        return window.localStorage.getItem('authtoken') || null;
    },
    removeAuthToken: function() {
        window.localStorage.removeItem('authtoken');
    },
    clientToken: function() {
        return window.localStorage.getItem('clientauthtoken') || null;
    },
    removeClientToken: function() {
        window.localStorage.removeItem('clientauthtoken');
    },
    isAuthenticated: function() {
        return !!this.authToken();
    },
    getToken: function() {
        if (this.authToken()) {
            return this.authToken();
        } else if (this.clientToken()) {
            return this.clientToken();
        } else {
            return null;
        }
    },
    onLoginCompleted: function(json) {
        this.updateToken(json.access_token);
    },
    logout: function() {
        window.localStorage.removeItem('authtoken');
        this._state = this.authToken();
        this.triggerChange();
    },
    updateToken: function(token) {
        window.localStorage.setItem('authtoken', token);
        this._state = this.authToken();
        this.triggerChange();
    },
    updateClientToken: function(token) {
        window.localStorage.setItem('clientauthtoken', token);
        this.triggerChange();
    },
    triggerChange: function() {
        this.trigger('change', this.isAuthenticated());
    }
});