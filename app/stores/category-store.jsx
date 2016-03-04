var sampleCategories = [{
    name: 'Tech',
    id: 'tech'
}, {
    name: 'Games',
    id: 'games'
},
{
    name: 'Podcasts',
    id: 'podcasts'
}];


var Reflux = require('reflux');
// var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getCategories: function() {
        this.categories = sampleCategories;
        this.triggerChange();
        // return Api.get('categories/defaults')
        //   .then(function(json){
        //     this.categories = json.data;
        //     this.triggerChange();
        //   }.bind(this));
    },
    triggerChange: function() {
        this.trigger('change', this.categories);
    }
});