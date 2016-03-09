/*

    TODO
    ======================================
    + Previous Post Day always says Today
    + If you aren't signed in and click on a users name it won't let you view it
    - Allow HTML in Comments and auto convert links to be clickable
    - Max media size
    - Add about page
    - Default msg when no content is available
    - Load more ... everything.  Infinite Scroll
    - Redo the CSS and HTML cause it sucks
    - Add a back button
*/


var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');


// ********************************** //
var DEBUG = false;
// ********************************** //


var mainWindow = null;
var maxWith = 550;

if (DEBUG) {
    require('crash-reporter').start();
    maxWith = 5000;
}


app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        width: 400,
        height: 700,
        'min-width': 350,
        'max-width': maxWith,
        'min-height': 400,
        'web-preferences': {
            'web-security': false
        },
        autoHideMenuBar: true,
        useContentSize: true
    });
    if (DEBUG) {
        mainWindow.maxWidth = 4000;
    }
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    if (DEBUG) {
        mainWindow.openDevTools();
    }

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    // Custom Events
    ipc.on('set-window-title', function(e, title) {
        mainWindow.setTitle(title);
    });



    require('./app-menu')(mainWindow, DEBUG);

});