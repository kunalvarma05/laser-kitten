var React = require('react');

var PostPreview = require('./post-preview');


module.exports = React.createClass({
    render: function() {
        return <div className="posts" key="posts">
            {this.props.posts ? this.renderPosts() : null}
        </div>
    },
    renderPosts: function() {
        return this.props.posts.map(function(post) {
            return <PostPreview key={post.id} {...post} />
        });
    }
});