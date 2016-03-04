var React = require('react');
var Reflux = require('reflux');

var AuthStore = require('../../../stores/auth-store');


module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(AuthStore, 'onAuthChange'),
    ],
    getDefaultProps: function() {
        return {
            className: 'badge'
        }
    },
    getInitialState: function() {
        return {
            isAuth: AuthStore.isAuthenticated(),
        }
    },
    render: function() {       
        return <div className={"vote-btn "+this.props.className} onClick={this.handleClick}>
            {/* this.state.isAuth ? this.renderVoteBtn() : null */}
            {this.props.votes}
        </div>
    },
    renderVoteBtn: function() {
        return <div className="vote-up-arrow">
            <i className="fa fa-caret-up"></i>
        </div>
    },
    handleClick: function(e) {
        e.preventDefault();
        if(this.state.isAuth) {
            console.log('vote on stuff!');
        }
    },
    onAuthChange:function(event, isAuth) {
        this.setState({
            isAuth: isAuth,
        });
    }
});