var Reflux = require('reflux');
var PostActions = require('../actions/post-actions');
var _ = require('underscore');
var notifier = require('node-notifier');


module.exports = Reflux.createStore({
    listenables: [PostActions],
    onGetPostsForDayCompleted: function(json) {
        this.posts = json.posts;
        this.triggerChange();
    },
    onGetPostCompleted: function(json) {
        this.posts = json.post;
        this.triggerChange();
    },
    onGetNewPostsForTodayCompleted: function(json) {
        
        var newPosts = json.posts.length - this.posts.length;

        if (newPosts > 0) {
            notifier.notify({
                'title': 'Product Hunt',
                'message': 'A new top post has been added for today'
            });
        }

        // var diffs = _.filter(json.post, function(obj) {
        //     return !_.findWhere(this.posts, obj);
        // }.bind(this));

        this.posts = json.posts;
        this.triggerChange();
    },
    triggerChange: function() {
        this.trigger('change', this.posts);
    }
});