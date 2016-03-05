var Menu = require('menu');
var MenuItem = require('menu-item');

module.exports = function(mainWindow, DEBUG) {

    // Example of menu from official sample
    // https://github.com/atom/electron/blob/master/atom/browser/default_app/default_app.js
    if (process.platform == 'darwin') {
        var template = [{
            label: 'Product Hunt',
            submenu: [{
                label: 'Hide Product Hunt',
                accelerator: 'Command+H',
                selector: 'hide:'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Shift+H',
                selector: 'hideOtherApplications:'
            }, {
                label: 'Show All',
                selector: 'unhideAllApplications:'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function() {
                    app.quit();
                }
            }, ]
        }, {
            label: 'Edit',
            submenu: [{
                label: 'Undo',
                accelerator: 'Command+Z',
                selector: 'undo:'
            }, {
                label: 'Redo',
                accelerator: 'Shift+Command+Z',
                selector: 'redo:'
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'Command+X',
                selector: 'cut:'
            }, {
                label: 'Copy',
                accelerator: 'Command+C',
                selector: 'copy:'
            }, {
                label: 'Paste',
                accelerator: 'Command+V',
                selector: 'paste:'
            }]
        }, {
            label: 'View',
            submenu: [{
                label: 'Toggle Full Screen',
                accelerator: 'Ctrl+Command+F',
                click: function() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }]
        }, {
            label: 'Window',
            submenu: [{
                label: 'Minimize',
                accelerator: 'Command+M',
                selector: 'performMiniaturize:'
            }, {
                label: 'Close',
                accelerator: 'Command+W',
                selector: 'performClose:'
            }, {
                type: 'separator'
            }, {
                label: 'Bring All to Front',
                selector: 'arrangeInFront:'
            }, ]
        }, {
            label: 'Help',
            submenu: [{
                label: 'Search Issues',
                click: function() {
                    require('shell').openExternal('https://github.com/imns/laser-kitten/issues');
                }
            }]
        }];


        // var cut = new MenuItem({
        //     label: "Cut",
        //     click: function () {
        //         document.execCommand("cut");
        //     }
        // });

        // var copy = new MenuItem({
        //     label: "Copy",
        //     click: function () {
        //         document.execCommand("copy");
        //     }
        // });

        // var paste = new MenuItem({
        //     label: "Paste",
        //     click: function () {
        //         document.execCommand("paste");
        //     }
        // });

        // var template = [{
        //     label: 'Product Hunt',
        //     submenu: [cut, copy, paste]
        // }];
        

        // var textMenu = new Menu();
        // textMenu.append(cut);
        // textMenu.append(copy);
        // textMenu.append(paste);

        // if(DEBUG) {
            
        // }


        menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    } else {
        var template = [{
            label: '&File',
            submenu: [{
                label: '&Open',
                accelerator: 'Ctrl+O',
            }, {
                label: '&Close',
                accelerator: 'Ctrl+W',
                click: function() {
                    mainWindow.close();
                }
            }, ]
        }, {
            label: '&View',
            submenu: [{
                label: '&Reload',
                accelerator: 'Ctrl+R',
                click: function() {
                    mainWindow.restart();
                }
            }, {
                label: 'Toggle &Full Screen',
                accelerator: 'F11',
                click: function() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }]
        }];
        menu = Menu.buildFromTemplate(template);
        mainWindow.setMenu(menu);
    }

}