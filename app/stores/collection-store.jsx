var Reflux = require('reflux');
// var Api = require('../utils/api');
var CollectionActions = require('../actions/collection-actions');
var _ = require('underscore');
var qs = require('querystring');

module.exports = Reflux.createStore({
    listenables: [CollectionActions],
    onGetCollectionsCompleted: function(json) {
        this.collections = json.collections;
        this.triggerChange();
    },
    onGetCollectionCompleted: function(json) {
        this.collections = json.collection;
        this.triggerChange();
    },
    find: function(id) {
        var collection = _.findWhere(this.collections, {
            id: id
        });

        if (collection) {
            return collection
        } else {
            this.getCollection(id);
            return null
        }
    },
    triggerChange: function() {
        this.trigger('change', this.collections);
    }
});