var Reflux = require('reflux');
var AppActions = require('../actions/app-actions');

module.exports = Reflux.createStore({
    listenables: [AppActions],
    init: function() {
        this.appSettings = {
            selectedView: 'home'
        };
    },
    selectView: function(view) {
        this.appSettings.selectedView = view;
        this.triggerChange();
    },
    triggerChange: function() {
        this.trigger('change', this.appSettings);
    }
});