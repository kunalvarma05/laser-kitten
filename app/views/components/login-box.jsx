var remote = window.require('remote');
var ipc = window.require('ipc');
var BrowserWindow = remote.require('browser-window');

var React = require('react');

var Actions = require('../../actions');

var Login = React.createClass({

    componentWillMount: function() {
        console.log('Login is about to mount');
    },

    render: function() {
        return <div className="login">
            <p>You can login below homies</p>
            <button className="btn btn-default login-btn" onClick={this.openAuthWindow}>Login to Product Hunt</button>
        </div>
    },
    openAuthWindow: function() {
        var self = this;

        // Start Login
        var authUrl = [
            rootUrl,
            'oauth/authorize?',
            'client_id=' + clientId,
            '&redirect_uri=http://localhost:3000/',
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
            console.log('got the code: ' + code);
            console.log(Actions);
            Actions.login(code);
        } else if (error) {
            alert('Oops! Something went wrong and we couldn\'t ' +
                'log you in using Product Hunt. Please try again.');
        }
    }
});

module.exports = Login;