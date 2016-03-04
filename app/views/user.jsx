var remote = window.require('remote');
var ipc = window.require('ipc');
var BrowserWindow = remote.require('browser-window');

var React = require('react');
var Reflux = require('reflux');

var UserActions = require('../actions/user-actions');
var UserStore = require('../stores/user-store');
var AuthStore = require('../stores/auth-store');
var AppActions = require('../actions/app-actions');

var Login = require('./auth');
var UserSecondaryMenu = require('./components/users/user-secondary-menu');
var Loading = require('./components/loading');

var config = require('../utils/config');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(UserStore, 'onUserChange'),
        Reflux.listenTo(AuthStore, 'onAuthChange'),
    ],
    getInitialState: function() {
        return {
            user: null,
            isAuth: AuthStore.isAuthenticated(),
            isLoading: false
        }
    },
    componentWillMount: function() { 
        if(!this.props.params.id) {
            if(this.state.isAuth) {
                UserActions.getMe();
            }
        } else {
            UserActions.getUser(this.props.params.id);
        }
        this.setState({isLoading: true});
        AppActions.selectView("user");
    },
    componentWillReceiveProps: function(nextProps) {
        if(!nextProps.params.id) {
            if(this.state.isAuth) {
                UserActions.getMe();
            }
        } else {
            UserActions.getUser(nextProps.params.id);
        }
        this.setState({isLoading: true});
        AppActions.selectView("user");
    },
    render: function() {
        if(!this.state.isAuth) {
            return <Login />
        }

        if(this.state.isLoading) {
            return <Loading />
        }

        return <div className="user">
            {this.state.user ? this.renderUser() : null}
        </div>
    },
    renderUser: function() {
        return <div>
            {this.renderHeader()}
            <UserSecondaryMenu {...this.state.user} />  
        </div>
    },
    renderHeader: function() {
        var url = this.state.user.image_url['73px'];
        return <div className="user-meta fixed text-center">
            <img className="img-circle" src={url} />
            <h3>{this.state.user.name}</h3>
            <div className="tagline">{this.state.user.headline}</div>
            <div className="user-follower-count small clearfix">
                <span className="pull-left">Followers {this.state.user.followers_count}</span>
                <span className="pull-right">Following {this.state.user.followings_count}</span>
            </div>
        </div>
    },
    onUserChange: function(event, user) {
        this.setState({
            user: user,
            isLoading: false
        });
    },
    onAuthChange:function(event, isAuth) {
        this.setState({
            isAuth: isAuth,
            isLoading: false
        });

        // since auth changed, they might have signed in
        // so we have to fetch a user
        if(this.state.isAuth) {
            if(!this.props.params.id) {
                UserActions.getMe();
            } else {
                UserActions.getUser(this.props.params.id);
            }
        }
    }
});