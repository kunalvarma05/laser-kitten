var React = require('react');


module.exports = React.createClass({
    render: function() {
        return <div className="loader text-center">
            <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
        </div>
    },
});