var React = require('react');

var CollectionPreview = require('./collection-preview');

module.exports = React.createClass({
    render: function() {
        return <div>
            {this.props.collections ? this.renderCollection() : null}
        </div>
    },
    renderCollection: function() {
        return this.props.collections.map(function(collection) {
            return <CollectionPreview key={collection.id} {...collection} />
        });
    }
});