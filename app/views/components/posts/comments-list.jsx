var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    render: function() {
        return <div className="post-comments">
            <h3>Discusion <span className="badge">{this.props.comments_count}</span></h3>
            <hr />
            {this.props.comments ? this.renderComments() : null}
        </div>
    },
    renderComments: function() {
        var self = this;
        return this.props.comments.map(function(comment) {
            return <div key={comment.id}>
                <Link to={"/user/" + comment.user.id}>
                    <h5>{comment.user.name} <small>{comment.user.headline}</small></h5>
                </Link>
                <p>{comment.body}</p>
                {comment.child_comments.length > 0 ? this.renderChildComments(comment.child_comments) : null}
                <hr />
            </div>
        }.bind(this));
    },
    renderChildComments: function(comments) {
        return comments.map(function(comment) {
            return <div className="child-comment" key={comment.id}>
                <hr />
                <Link to={"/user/" + comment.user.id}>
                    <h5>{comment.user.name} <small>{comment.user.headline}</small></h5>
                </Link>
                <p>{comment.body}</p>
            </div>
        });
    },
});