var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
    render: function() {
        return <div className="users-list">
            {this.props.users ? this.renderUsers() : null}
        </div>
    },
    renderUsers: function() {
        return this.props.users.map(function(user) {
            var userImg = user.image_url['44px'];
            return <Link to={"/user/" + user.id} key={user.id} className="user-item col-xs-6 col-sm-4">
                <div className="text-center">
                    <div className="user-thumb">
                        <img className="img-circle" src={userImg} />
                    </div>
                    <div className="user-details">
                        <b>{user.name}</b><br />
                        <small>{user.headline}</small>
                    </div>
                </div>
            </Link>
        }.bind(this));
    },

    handleLoadMore: function() {
        console.log('loading more users');
    }
});