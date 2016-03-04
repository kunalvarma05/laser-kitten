var Reflux = require('reflux');
var UserActions = require('../actions/user-actions');

module.exports = Reflux.createStore({
    listenables: [UserActions],
    onGetUserCompleted: function(json) {
        this.user = json.user;
        this.triggerChange();
    },
    onGetMeCompleted: function(json) {
        this.user = json.user;
        this.triggerChange();
    },
    triggerChange: function() {
        this.trigger('change', this.user);
    }
});