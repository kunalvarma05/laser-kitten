var Reflux = require('reflux');
// var Actions = require('../actions');


module.exports = Reflux.createStore({
    listenables: [Actions],
    // init: function () {
    //     if (this.hasSettings()) {
    //         this.getCollection().insert(this.settings);
    //     }
    // },
    // updateSettings: function(data) {
    //     this.save(data);
    // },
    // hasSettings: function() {
    //     var settings = this.getSettings();
    //     return (settings || settings.length > 0);
    // },
    // getCollection: function() {
    //     return db.getCollection("settings");
    // },
    // getSettings: function() {
    //     return settingsCollection.findOne({key: 'settings'});
    // },
    // save: function(data) {
    //     this.settings = this.getSettings().update(data);
    //     this.triggerChange();       
    // }
    triggerChange: function() {
        this.trigger('change', this.settings);
    }
});