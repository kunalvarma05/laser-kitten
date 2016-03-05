var Reflux = require('reflux');
var NotificationActions = require('../actions/notification-actions');

module.exports = Reflux.createStore({
    listenables: [NotificationActions],
    onGetNotificationsCompleted: function(json) {
        this.notifications = json.notifications;
        this.triggerChange();
    },
    onGetNotificationsFailed: function(json) {
    },
    triggerChange: function() {
        this.trigger('change', this.notifications);
    }
});