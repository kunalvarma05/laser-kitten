var Reflux = require('reflux');

var qs = require('querystring');

var CollectionActions = Reflux.createActions({
    'getCollections': {
        asyncResult: true,
        children: ["progressed"]
    },
    'getCollection': {
        asyncResult: true,
        children: ["progressed"]
    }    
});


CollectionActions.getCollections.listen(function(filters) {
    var API = require('../utils/api');
    var url = 'collections?';

    var filterObj = {};
    if(filters) {
        if(filters.isFeatured) {
            filterObj['search[featured]'] = filters.isFeatured;
        }
        if(filters.perPage) {
            filterObj['per_page'] = filters.perPage ;
        }
        if(filters.category) {
            filterObj['search[category]'] = filters.category;
        }
    }

    url = url + qs.stringify(filterObj);
    API.get(url)
        .then(this.completed)
        .catch(this.failed);
});


CollectionActions.getCollection.listen(function(id) {
    var API = require('../utils/api');

    API.get('collections/'+id)
        .then(this.completed)
        .catch(this.failed);
});

module.exports = CollectionActions;