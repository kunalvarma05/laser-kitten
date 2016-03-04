var React = require('react');
var Reflux = require('reflux');
var CollectionActions = require('../actions/collection-actions');
var AppActions = require('../actions/app-actions');


var CollectionStore = require('../stores/collection-store');
var PostsList = require('./components/posts/posts-list');
var Loading = require('./components/loading');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(CollectionStore, 'onChange')
    ],
    getInitialState: function() {
        return {
            collection: null,
            isLoading: false
        }
    },      
    componentWillMount: function() {
        this.setState({
            isLoading: true
        });
        CollectionActions.getCollection(this.props.params.id);
        AppActions.selectView("collections");
    },
    render: function() {
        if(this.state.isLoading) {
            return <Loading />
        }

        return <div className="collection">
            {this.state.collection ? this.renderCollection() : this.renderNoCollection()}
        </div>
    },
    renderNoCollection: function() {
        return <h3 className="text-center">No Collection</h3>
    },
    renderCollection: function() {
        return <div>
            <h3 className="text-center">{this.state.collection.name}</h3>
            <hr />
            <PostsList posts={this.state.collection.posts} />
        </div>
    },
    onChange: function(event, collection) {
        this.setState({
            collection: collection,
            isLoading: false
        });
    }
});