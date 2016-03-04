var remote = window.require('remote');
var shell = remote.require('shell');
var _ = window.require('underscore');

var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var PostActions = require('../actions/post-actions');
var PostStore = require('../stores/post-store');
var AuthStore = require('../stores/auth-store');
var AppActions = require('../actions/app-actions');

var VoteBox = require('./components/posts/vote-box');
var PostSecondaryMenu = require('./components/posts/post-secondary-menu');
var Loading = require('./components/loading');


module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(PostStore, 'onChange'),
        Reflux.listenTo(AuthStore, 'onAuthChange')
    ],
    getInitialState: function() {
        return {
            post: null,
            isAuth: AuthStore.isAuthenticated()
        }
    },    
    componentWillMount: function() {
        PostActions.getPost(this.props.params.id);
        AppActions.selectView("home");
    },
    componentWillReceiveProps: function(nextProps) {
        PostActions.getPost(nextProps.params.id);
    },
    render: function() {
        return <div className="post-detail fixed">
            {this.state.post ? this.renderContent() : <Loading />}
        </div>
    },
    postImgStyles: function() {
        var headerMedia = _.find(this.state.post.media, function(obj) {
            return obj.id === this.state.post.header_media_id;
        }.bind(this));

        var styles = '';
        if(headerMedia) {
            var imgUrl = headerMedia.image_url + '?auto=format&w=500&h=250';
            styles = 'linear-gradient(rgba(1, 28, 38, 0.8), rgba(1, 28, 38, 0.8)), url(' + imgUrl + ')';
        } else {
            styles = '#588C8C'
        }

        return {
            background: styles
        }
    },
    renderContent: function() {
        return <div>
            {/*
            <div className="post-filters">
                <a href="#" className="pull-left">
                    <i className="fa fa-chevron-left"></i> Go back
                </a>
            </div>
            */}
            <div className="post-img cover" style={this.postImgStyles()}>
                <div className="post-meta vcenter">
                    <h1>{this.state.post.name}</h1>
                    <div className="tagline">{this.state.post.tagline}</div>
                    <div className="vote-box">
                        <VoteBox className="btn btn-default" votes={this.state.post.votes_count} />
                    </div>
                    <a href="#" 
                        className="btn btn-orange" 
                        data-url={this.state.post.redirect_url} 
                        onClick={this.handleGoToClick}
                    >Get it</a>
                </div>
                <div className="made-by small"> 
                    Via <Link to={"/user/" + this.state.post.user.id}>{this.state.post.user.name}</Link>
                </div>
                {/* this.state.isAuth ? this.renderAddToCollection() : null */}
            </div>

            <PostSecondaryMenu {...this.state.post} />           
        </div>
    },
    renderAddToCollection: function() {
        return <Link to="/collection/add/" className="add-to-collection">
            <i className="fa fa-list"></i>
        </Link>
    },
    handleGoToClick: function(e) {
        e.preventDefault();
        var url = e.target.getAttribute('data-url');
        shell.openExternal(url);
    },
    onChange: function(e, posts) {
        this.setState({
            post: posts
        });
    },
    onAuthChange: function(e, isAuth) {
        this.setState({
            isAuth: isAuth
        });
    }
});