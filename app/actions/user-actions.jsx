var Reflux = require('reflux');

var UserActions = Reflux.createActions({
    'getUser': {
        asyncResult: true,
        children: ["progressed"]
    },
    'getMe': {
        asyncResult: true,
        children: ["progressed"]
    }    
});

UserActions.getUser.listen(function(id) {
    var API = require('../utils/api');

    API.get('users/'+id)
        .then(this.completed)
        .catch(this.failed);
});

UserActions.getMe.listen(function() {
    var API = require('../utils/api');

    API.get('me/')
        .then(this.completed)
        .catch(this.failed);
});

module.exports = UserActions;