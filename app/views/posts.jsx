var ipc = window.require('ipc');
var moment = require('moment');

var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

var _ = require('underscore');

var PostActions = require('../actions/post-actions');
var PostStore = require('../stores/post-store');
var AppActions = require('../actions/app-actions');

var PostsList = require('./components/posts/posts-list');
var Loading = require('./components/loading');

var SetIntervalMixin = require('./mixins/set-interval');


// TODO: add things to the top of the list http://blog.vjeux.com/2013/javascript/scroll-position-with-react.html
module.exports = React.createClass({
    mixins: [
      Reflux.listenTo(PostStore, 'onChange'),  
      SetIntervalMixin,
    ],
    getDefaultProps: function() {
        return {
            params: {
                id: 'tech'
            }
        };
    },
    getInitialState: function() {
        return {
            posts: [],
            category: 'tech',
            isFeatured: true,
            currentDay: moment(),
            isLoading: true
        }
    },
    componentWillMount: function() { 
        PostActions.getPostsForDay(this.formatted(this.state.currentDay));
        AppActions.selectView("home");
    },
    componentDidMount: function() { 
        var fiveMin = 5 * 60 * 1000;
        this.setInterval(this.checkForNewPosts, fiveMin);
    },
    render: function() {
        if(this.state.isLoading) {
            return <Loading />
        }

        return <div>
            <div className="post-filters fixed-top">
                {this.state.isFeatured ? this.renderFeaturedFilters() : this.renderUpcomingFilters()}
            </div>
            <div className="posts-list fixed scrollable">
                <PostsList posts={this.state.posts} />
            </div>
        </div>
    },

    checkForNewPosts: function() {
        if(this.isToday(this.state.currentDay)) {
            PostActions.getNewPostsForToday(this.formatted(this.getToday()));
        }
    },

    // FILTERS
    formatted: function(date) {
        return date.format("YYYY-MM-DD");
    },
    getPreviousDay: function() {
        return moment(this.state.currentDay).subtract(1, 'days');
    },
    // Todays Date
    getToday: function() {
        return moment();
    },
    getNextDay: function() {
        return moment(this.state.currentDay).add(1, 'days');
    },
    getPrettyDate: function(date) {
        if(this.isToday(date)) {
            return 'Today';
        } else if(this.isYesterday(date)) {
            return 'Yesterday';
        } else {
            return date.format("MMMM Do");
        }
    },
    isToday: function(date) {
        if(!date) {
            date = this.state.currentDay;
        }
        return date.isSame(moment(), 'day');
    },
    isYesterday: function(date) {
        if(!date) {
            date = this.state.currentDay;
        }
        return date.isSame(moment().subtract(1, 'days'), 'day');
    },
    renderFeaturedFilters: function() {
        return <div>
            {this.renderPreviousDay()}
            <h5 className="text-center posts-date">{this.getPrettyDate(this.state.currentDay)}</h5>
            {this.renderNextDay()}
        </div>
    },
    renderPreviousDay: function() {
        var formattedDate = this.getPreviousDay().format('MMM Do');
        return <a href="#" className="previous-day-btn pull-left" onClick={this.handlePreviousDay}>
            <i className="fa fa-chevron-left"></i> {formattedDate}
        </a>
    },
    renderNextDay: function() {
        if(this.isToday()) {
            return null;
        }
        var formattedDate = this.getNextDay().format('MMM Do');
        return <a href="#" className="next-day-btn pull-right" onClick={this.handleNextDay}>
            {formattedDate} <i className="fa fa-chevron-right"></i>
        </a>
    },
    renderUpcomingFilters: function() {
        return null;
    },
    

    // EVENT HANDLERS
    handlePreviousDay: function(e) {
        var perviousDay = this.getPreviousDay();
        PostActions.getPostsForDay(this.formatted(perviousDay));
        this.setState({
            currentDay: perviousDay,
            isLoading: true
        });
    },
    handleNextDay: function(e) {
        var nextDay = this.getNextDay()
        PostActions.getPostsForDay(this.formatted(nextDay));
        this.setState({
            currentDay: nextDay,
            isLoading: true
        });
    },
    onChange: function(event, newPosts) {
        this.setState({
            posts: newPosts,
            isLoading: false
        });
    }
});