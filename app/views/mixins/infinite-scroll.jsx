var Reflux = require('reflux');

module.exports = function(selector, store, callback) {
    var Mixin = {
        selector: selector,
        el: null,
        store: store,
        cb: callback,
        canContinue: true, 
        mixins: [
          Reflux.listenTo(store, 'onStoreUpdated') 
        ],
        componentDidMount: function() {
            console.log('componentDidMount mixin');
            this.el = document.querySelector(selector);
            this.el.addEventListener('scroll', this.handleScroll, false);
        },
        componentWillUnmount: function() {
            this.el.removeEventListener('scroll', this.handleScroll, false);
        },
        handleScroll: function(e) {
            var el = e.currentTarget;
            var offset = (el.scrollTop + window.innerHeight) * 1.2 ;
            var height = el.scrollHeight;
            if (offset >= height && this.canContinue) {
                this.canContinue = false;
                this[this.cb]();
            }
        },
        onStoreUpdated: function(e, newElements) {
            this.canContinue = true
        }
    };

    return Mixin;
}