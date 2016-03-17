var app = require('app');
// var remote = require('remote');
// var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var MenuItem = require('menu-item');

module.exports = function(mainWindow, DEBUG) {

    // Example of menu from official sample
    // https://github.com/atom/electron/blob/master/atom/browser/default_app/default_app.js


    var separator = {
        type: 'separator'
    }


    // FILE MENU
    var fileMenu = {
        label: 'Laser Kitten',
        submenu: []
    }

    var hide = {
        label: 'Hide Laser Kitten',
        accelerator: 'Command+H',
        type: 'normal',
        enabled: true,
        visible: true,
        selector: 'hide:'
    }
    var hideothers = {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
    }
    var unhide = {
        label: 'Show All',
        selector: 'unhideAllApplications:'
    }

    var quit = {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
            app.quit();
        }
    }
    fileMenu.submenu.push(hide, hideothers, unhide, separator, quit);

    // EDIT MENU
    var editMenu = {
        label: 'Edit',
        submenu: []
    }

    var undo = {
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
    }
    var redo = {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
    }
    var cut = {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
    }
    var copy = {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
    }
    var paste = {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
    }
    editMenu.submenu.push(undo, redo, separator, cut, copy, paste);


    // VIEW MENU
    var viewMenu = {
        label: 'View',
        submenu: []
    }

    var toggleFullScreen = {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: function() {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
    }
    viewMenu.submenu.push(toggleFullScreen);


    // WINDOW MENU
    var windowMenu = {
        label: 'Window',
        submenu: []
    }

    var minimize = {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'minimize:'
    }
    var close = {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'close:'
    }
    var front = {
        label: 'Bring All to Front',
        selector: 'front:'
    }
    windowMenu.submenu.push(minimize, close, separator, front);



    // HELP MENU
    var helpMenu = {
        label: 'Help',
        submenu: []
    };

    var issues = {
        label: 'Submit an Issues/Bug',
        click: function() {
            require('shell').openExternal('https://github.com/imns/laser-kitten/issues');
        }
    }
    var about = {
        label: 'About',
        click: function() {
            require('shell').openExternal('https://imns.github.io/laser-kitten');
        }
    }
    helpMenu.submenu.push(issues, about);

    // Make a nice template
    var template = [];
    template.push(fileMenu);
    template.push(editMenu);
    template.push(viewMenu);
    template.push(windowMenu);
    template.push(helpMenu);

    // Build a menu from the template and set the Application Menu
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}