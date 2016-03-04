var React = require('react');

var PostsList = require('../posts/posts-list');
var UsersList = require('./users-list');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            selectedSection: "upvoted",
            isExpanded: false
        }
    },  
    render: function() {
        return <div className="user-secondary fixed">
            <div className="user-filters fixed">
                {this.renderMenu()}
            </div>
            <div className="user-content fixed scrollable">
                {this.renderSection()}
            </div>
        </div>
    },
    renderMenu: function() {
        return <div className="secondary-btns">
            <ul className="nav nav-pills">
                <li className={this.state.selectedSection == 'upvoted' ? 'active' : '' }>
                    <a href="#" data-section="upvoted" onClick={this.handleClick}>Upvoted</a>
                </li>
                <li className={this.state.selectedSection == 'submitted' ? 'active' : '' }>
                    <a href="#" data-section="submitted" onClick={this.handleClick}>Submitted</a>
                </li>
                <li>
                    <a href="#" className="text-elipse dropdown-toggle" onClick={this.handleExpandedClick}>
                        <i className="fa fa-circle"></i>&nbsp; 
                        <i className="fa fa-circle"></i>&nbsp; 
                        <i className="fa fa-circle"></i>
                    </a>
                    <ul className={this.state.isExpanded ? "dropdown-menu dropdown-menu-right" : "dropdown-menu dropdown-menu-right hide"}>
                        <li className={this.state.selectedSection == 'made' ? 'active' : '' }>
                            <a href="#" data-section="made" onClick={this.handleClick}>Made</a>
                        </li>
                        <li className={this.state.selectedSection == 'collections' ? 'active' : '' }>
                            <a href="#" data-section="collections" onClick={this.handleClick}>Collections</a>
                        </li>
                        <li className={this.state.selectedSection == 'followers' ? 'active' : '' }>
                            <a href="#" data-section="followers" onClick={this.handleClick}>Followers</a>
                        </li>
                        <li className={this.state.selectedSection == 'following' ? 'active' : '' }>
                            <a href="#" data-section="following" onClick={this.handleClick}>Following</a>
                        </li>
                    </ul>
                </li>                
            </ul>
        </div>
    },
    postData: function() {
        return this.props.votes.map(function(vote) {
            return vote.post;
        });
    },
    renderSection: function() {
        var section = '';
        switch(this.state.selectedSection) {
            case 'upvoted':
                section = <PostsList posts={this.postData()} />
                break;
            case 'submitted':
                section = <PostsList posts={this.props.posts} />
                break;
            case 'made':
                section = <PostsList posts={this.props.maker_of} />
                break;
            case 'followers':
                section = <UsersList users={this.props.followers} />
                break;
            case 'following':
                section = <UsersList users={this.props.followings} />
                break;
            default:
                section = <PostsList posts={this.postData()} />
                break;
        }

        return section;
    },
    handleExpandedClick: function(e) {
        e.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded
        }); 
    },
    handleClick: function(e) {
        e.preventDefault();
        var ct = e.currentTarget;

        this.setState({
            selectedSection: ct.getAttribute('data-section'),
            isExpanded: false
        })
    }
});