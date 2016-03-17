var ipc = window.require('ipc');

var React = require('react');
var Link = require('react-router').Link;
var Reflux = require('reflux');

var AppStore = require('../../../stores/app-store');
var AuthStore = require('../../../stores/auth-store');

module.exports = React.createClass({
    mixins: [
      Reflux.listenTo(AppStore, 'onChange'),
      Reflux.listenTo(AuthStore, 'onAuthChange'),
    ],
    getInitialState: function() {
        return {
            currentView: 'home',
            isAuth: AuthStore.isAuthenticated()
        }
    },
    render: function() {
        var currentView = this.state.currentView;
        return  <div>
            <ul className="unstyled-list nav">
                <li>
                    <Link to="/" data-view="home" className={currentView == 'home' ? 'active' : ''}>
                        <i className="fa fa-home"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/collections" data-view="collections" className={currentView == 'collections' ? 'active' : ''}>
                        <i className="fa fa-th-list"></i>
                    </Link>
                </li>
                {this.state.isAuth ? this.renderNotifcations() : null}
                <li>
                    <Link to="/user" data-view="user" className={currentView == 'user' ? 'active' : ''}>
                        <i className="fa fa-user"></i>
                    </Link>
                </li>
                {/* 
                <li>
                    <Link to="/search" data-view="search" className={currentView == 'search' ? 'active' : ''}>
                        <i className="fa fa-search"></i>
                    </Link>
                </li>
                */}
            </ul>

            <div className="about">
                <a href="#" title="About Laser Kitten" onClick={this.handleAboutClick}>
                    <i className="fa fa-question-circle"></i>
                </a>
            </div>
        </div>
    },
    renderNotifcations: function() {
        return <li>
            <Link to="/notifications" data-view="notifications" className={this.state.currentView == 'notifications' ? 'active' : ''}>
                <i className="fa fa-bell"></i>
            </Link>
        </li>
    },
    onChange: function(e, appSettings) {
        var activeView = appSettings.selectedView;
        var title = 'Product Hunt';

        this.setState({
            currentView: activeView
        });

        switch(activeView) {
            case 'home':
                title = 'Posts';
                break;
            case 'collections':
                title = 'Collections';
                break;
            case 'notifications':
                title = 'Notifications';
                break;
            case 'user':
                title = 'User';
                break;
            case 'search':
                title = 'Search';
                break;
            default:
                break;
        }

        ipc.send('set-window-title', title);            
    },
    handleAboutClick: function(e) {
        e.preventDefault();
        ipc.send('open-about-window');
    },
    onAuthChange: function(e, isAuth) {
        this.setState({
            isAuth: isAuth
        });
    }
});