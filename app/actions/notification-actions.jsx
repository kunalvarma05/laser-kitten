var Reflux = require('reflux');

var NotificationActions = Reflux.createActions({
    'getNotifications': {
        asyncResult: true,
        children: ["progressed"]
    }    
});

NotificationActions.getNotifications.listen(function() {
    var API = require('../utils/api');

    API.get('notifications/')
        .then(this.completed)
        .catch(this.failed);
});

module.exports = NotificationActions;