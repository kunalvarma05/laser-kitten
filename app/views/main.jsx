var React = require('react');

var Sidebar = require('./components/sidebar/sidebar');
var Footer = require('./components/footer');

var PostList = require('./posts');

module.exports = React.createClass({
    render: function() {
        return <div>
            <div className="row">
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="main">
                    {this.content()}
                </div>
            </div> 
            <Footer />
        </div>
    },
    content: function() {
        if(this.props.children) {
            return this.props.children
        } else {
            return <PostList />
        }
    }
});