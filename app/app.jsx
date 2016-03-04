(function() {
	var React = require('react');
    var ReactDOM = require('react-dom');
    // var Actions = require('./actions/auth-actions');
	var Routes = require('./routes');
	window.React = React;
    // window.Actions = Actions;

	module.exports = ReactDOM.render(Routes, document.querySelector('.content'));
})();