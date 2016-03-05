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

module.exports = Reflux.createStore({
    listenables: [Actions],
    getCategories: function() {
        this.categories = sampleCategories;
        this.triggerChange();
    },
    triggerChange: function() {
        this.trigger('change', this.categories);
    }
});