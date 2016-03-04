var React = require('react');

var CommentsList = require('./comments-list');
var MediaList = require('./media-list');
var PostsList = require('./posts-list');
var UsersList = require('../users/users-list');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            selectedSection: "comments"
        }
    },  
    render: function() {
        return <div className="post-secondary fixed">
            {this.renderMenu()}
            <div className="post-content fixed scrollable">
                {this.renderSection()}
            </div>
        </div>
    },
    renderMenu: function() {
        return <div className="secondary-btns">
            <ul className="nav nav-pills">
                <li className={this.state.selectedSection == 'comments' ? 'active' : '' }>
                    <a href="#" data-section="comments" onClick={this.handleClick}>Comments</a>
                </li>
                <li className={this.state.selectedSection == 'media' ? 'active' : '' }>
                    <a href="#" data-section="media" onClick={this.handleClick}>Media</a>
                </li>
                <li className={this.state.selectedSection == 'similar' ? 'active' : '' }>
                    <a href="#" data-section="similar" onClick={this.handleClick}>Similar</a>
                </li>
                <li className={this.state.selectedSection == 'upvotes' ? 'active' : '' }>
                    <a href="#" data-section="upvotes" onClick={this.handleClick}>Upvotes</a>
                </li>
            </ul>
        </div>
    },
    userData: function() {
        return this.props.votes.map(function(vote) {
            return vote.user;
        });
    },
    renderSection: function() {
        var section = '';
        switch(this.state.selectedSection) {
            case 'comments':
                if(!this.props.comments || this.props.comments.length == 0) {
                    section = <h3 className="text-center no-content">No Comments Yet</h3>
                } else {
                    section = <CommentsList comments={this.props.comments} comments_count={this.props.comments_count} />
                }
                break;

            case 'media':
                if(!this.props.media || this.props.media.length == 0) {
                    section = <h3 className="text-center no-content">No Media to Display</h3>
                } else {
                    section = <MediaList media={this.props.media} />
                }
                break;

            case 'similar':
                if(!this.props.related_posts || this.props.related_posts.length == 0) {
                    section = <h3 className="text-center no-content">No Similar Posts Yet</h3>
                } else {
                    section = <PostsList posts={this.props.related_posts} />
                }
                break;

            case 'upvotes':
                var userData = this.userData();
                if(!userData || userData == 0) {
                    section = <h3 className="text-center no-content">No Votes Yet</h3>
                } else {
                    section = <UsersList users={userData} />
                }
                break;

            default:
                section = <CommentsList comments={this.props.comments} comments_count={this.props.comments_count} />
                break;
        }

        return section;
    },
    handleClick: function(e) {
        e.preventDefault();
        var ct = e.currentTarget;

        this.setState({
            selectedSection: ct.getAttribute('data-section')
        })
    }
});