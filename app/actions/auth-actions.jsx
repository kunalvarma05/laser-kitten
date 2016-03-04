var Reflux = require('reflux');

var AuthActions = Reflux.createActions({
    'login': {
        asyncResult: true,
        children: ["progressed"]
    },
    'logout': {}
});


AuthActions.login.listen(function(code) {
    var API = require('../utils/api');

    API.getAuthToken(code)
        .then(this.completed)
        .catch(this.failed);
});


module.exports = AuthActions;