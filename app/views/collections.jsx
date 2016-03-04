var ipc = window.require('ipc');

var React = require('react');
var Reflux = require('reflux');
var CollectionActions = require('../actions/collection-actions');
var AppActions = require('../actions/app-actions');

var CollectionStore = require('../stores/collection-store');

var CollectionFilters = require('./components/collections/collection-filters');
var CollectionsList = require('./components/collections/collections-list');
var Loading = require('./components/loading');

module.exports = React.createClass({
    mixins: [
      Reflux.listenTo(CollectionStore, 'onChange')
    ],
    getInitialState: function() {
        return {
            collections: null,
            perPage: 10,
            isFeatured: true,
            category: "tech",
            isLoading: false
        }
    },
    getFiltersObj: function() {
        return {
            perPage: this.state.perPage,
            isFeatured: this.state.isFeatured,
            category: this.state.category
        }
    },
    componentWillMount: function() {
        this.setState({
            isLoading: true
        });
        CollectionActions.getCollections(this.getFiltersObj());
        AppActions.selectView("collections");
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            isLoading: true
        });
        CollectionActions.getCollections(this.getFiltersObj());
        AppActions.selectView("collections");
    },
    fetchCollections: function() {

    },
    render: function() {
        if(this.state.isLoading) {
            return <Loading />
        }

        return <div className="collections">
            <div className="fixed-top">
                <CollectionFilters 
                    filters={this.getFiltersObj()}
                    onFeaturedClicked={this.whenFeaturedClicked}
                    onPerPageClicked={this.whenPerPageClicked} 
                    onCategoryClicked={this.whenCategoryClicked} />
            </div>
            {this.state.collections ? this.renderCollections() : this.renderNoCollections()}
        </div>
    },
    renderNoCollections: function() {
        return <h3 className="text-center">No Collection</h3>
    },
    renderCollections: function() {
        return <div className="collections-list fixed scrollable">
            <CollectionsList collections={this.state.collections} />
        </div>
    },
    whenFeaturedClicked: function(e) {
        e.preventDefault();
        var isFeatured = !this.state.isFeatured;
        this.setState({
            isFeatured: isFeatured,
            isLoading: true
        });
        CollectionActions.getCollections({
            perPage: this.state.perPage,
            isFeatured: isFeatured,
            category: this.state.category
        });
    },
    whenPerPageClicked: function(perPage) {
        this.setState({
            perPage: perPage,
            isLoading: true
        });
        CollectionActions.getCollections({
            perPage: perPage,
            isFeatured: this.state.isFeatured,
            category: this.state.category
        });
    },
    whenCategoryClicked: function(category) {
        this.setState({
            category: category,
            isLoading: true
        });
        CollectionActions.getCollections({
            perPage: this.state.perPage,
            isFeatured: this.state.isFeatured,
            category: category
        });
    },
    onChange: function(event, collections) {
        this.setState({
            collections: collections,
            isLoading: false
        })
    }
});