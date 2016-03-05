(function() {
	var React = require('react');
    var ReactDOM = require('react-dom');
	var Routes = require('./routes');
	window.React = React;

	module.exports = ReactDOM.render(Routes, document.querySelector('.content'));
})();