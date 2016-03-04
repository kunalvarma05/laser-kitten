var remote = window.require('remote');
var ipc = window.require('ipc');
var BrowserWindow = remote.require('browser-window');

var React = require('react');
var Reflux = require('reflux');

var AuthActions = require('../actions/auth-actions');
var AuthStore = require('../stores/auth-store');

var config = require('../utils/config');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, 'onAuthChange')
    ],
    getInitialState: function() {
        return {
            isAuth: AuthStore.isAuthenticated(),
            user: null
        }
    },
    componentWillMount: function() { 
        
    },
    render: function() {
        return <div className="text-center">
            {this.state.isAuth ? this.renderUser() : this.renderLogin()}
        </div>
    },
    renderUser: function() {
        return <div className="user">
            <p>Oh hey you hound dog</p>
            <p>
                <button className="btn btn-default logout-btn" onClick={this.handleLogout}>Logout of Product Hunt</button>
            </p>
        </div>
    },
    renderLogin: function() {
        return <div className="login">
            <p>You can login below homies</p>
            <button className="btn btn-default login-btn" onClick={this.openAuthWindow}>Login to Product Hunt</button>
        </div>
    },
    openAuthWindow: function() {
        var self = this;

        // Start Login
        var authUrl = [
            config.rootUrl,
            'oauth/authorize?',
            'client_id=' + config.clientId,
            '&redirect_uri=' + config.redirectUrl,
            '&response_type=code',
            '&scope=public+private'
        ].join('');

        //Build the OAuth consent page URL
        this.authWindow = new BrowserWindow({
            width: 800,
            height: 600,
            show: true,
            'web-preferences': {
                'node-integration': false
            }
        });
        this.authWindow.loadUrl(authUrl);

        this.authWindow.webContents.on('will-navigate', function(event, url) {
            self.parseCode(url);
        });

        this.authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {
            self.parseCode(newUrl);
        });

        // If "Done" button is pressed, hide "Loading"
        this.authWindow.on('close', function() {
            self.authWindow.destroy();
        });
    },
    parseCode: function(url) {
        var raw_code = /code=([^&]*)/.exec(url) || null;
        var code = (raw_code && raw_code.length> 1) ? raw_code[1] : null;
        var error = /\?error=(.+)$/.exec(url);

        if (code || error) {
            this.authWindow.destroy();
        }

        if (code) {
            // console.log('got the code: ' + code);
            // console.log('Actions');
            // console.log(Actions);
            AuthActions.login(code);
        } else if (error) {
            alert('Oops! Something went wrong and we couldn\'t ' +
                'log you in using Product Hunt. Please try again.');
        }
    },
    handleLogout: function(e) {
        AuthActions.logout();
    },

    onAuthChange: function(event, isAuth) {
        this.setState({
            isAuth: isAuth
        });
    }
});