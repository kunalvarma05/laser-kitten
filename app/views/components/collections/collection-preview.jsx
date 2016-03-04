var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  render: function() {
    return  <Link to={"/collection/"+this.props.id} className="collection-item">
        <div className="cover collection-preview" style={this.collectionHeaderStyles()}></div>
        <div className="text-center">
            <h4>{this.props.name}</h4>
            <small>{this.props.title}</small>
        </div>
    </Link>   
  },
  collectionHeaderStyles: function() {
    if(this.props.background_image_url) {
        return {
          backgroundImage: 'url(' + this.props.background_image_url + ')'
        }
    } else {
        return {
          backgroundColor: this.props.color
        }
    }
  }
});
