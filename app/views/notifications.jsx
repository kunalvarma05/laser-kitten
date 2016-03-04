var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Reflux = require('reflux');

var NotificationsActions = require('../actions/notification-actions');
var NotificationsStore = require('../stores/notification-store');
var AppActions = require('../actions/app-actions');

var Loading = require('./components/loading');


module.exports = React.createClass({
    mixins: [
      Reflux.listenTo(NotificationsStore, 'onChange'),
    ],
    getInitialState: function() {
        return {
            notifications: null,
            isLoading: true
        }
    },
    componentWillMount: function() { 
        this.setState({
            isLoading: true
        });
        NotificationsActions.getNotifications();
        AppActions.selectView("notifications");
    },
    render: function() {
        return <div className="notifications fixed scrollable">
            { this.state.isLoading ? <Loading /> : this.renderNotifications() }
        </div>
    },
    renderNotifications: function() {
        if(this.state.notifications) {
            return this.renderNotificationsList();
        }
        return this.renderNoNotifications();
    },
    renderNotificationsList: function() {
        var key = 0;
        return this.state.notifications.map(function(notification) {
            key++;
            var img = (notification.from_user && notification.from_user.image_url) ? notification.from_user.image_url['40px'] : null;
            return <Link to={"/post/" + notification.reference.id} key={key} className="notification-item">
                <div className="">
                    <div className="notification-thumb">
                        <img className="img-circle" src={img} />
                    </div>
                    <div className="notification-details">
                        <b>{notification.from_user.name}</b><br />
                        <small className="notification-desc">{notification.sentence}</small>
                    </div>
                </div>
                <hr />
            </Link>
        });
    },
    renderNoNotifications: function() {
        return <h3 className="text-center">No Notifications</h3>
    },
    onChange: function(event, notifications) {
        this.setState({
            notifications: notifications,
            isLoading: false
        });
    }
});