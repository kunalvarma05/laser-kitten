var React = require('react');
var Reflux = require('reflux');

var AppActions = require('../actions/app-actions');

module.exports = React.createClass({
    componentWillMount: function() { 
        AppActions.selectView("search");        
    },
    render: function() {
        return <div className="search text-center">
            <p>search</p>
        </div>
    }
});