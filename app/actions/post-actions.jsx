var Reflux = require('reflux');

var PostActions = Reflux.createActions({
    'getPostsForDay': {
        asyncResult: true,
        children: ["progressed"]
    },
    'getPost': {
        asyncResult: true,
        children: ["progressed"]
    },
    'getNewPostsForToday': {
        asyncResult: true,
        children: ["progressed"]
    } 
});

PostActions.getPostsForDay.listen(function(day) {
    var API = require('../utils/api');
    API.get('posts?day='+day)
        .then(this.completed)
        .catch(this.failed);
});

PostActions.getPost.listen(function(id) {
    var API = require('../utils/api');

    API.get('posts/'+id)
        .then(this.completed)
        .catch(this.failed);
});

PostActions.getNewPostsForToday.listen(function(day) {
    var API = require('../utils/api');
    API.get('posts?day='+day)
        .then(this.completed)
        .catch(this.failed);
});




module.exports = PostActions;


/*




 */