var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var VoteBox = require('./vote-box');

module.exports = React.createClass({
  render: function() {
    var postThumbStyles = {
      backgroundImage: 'url(' + this.props.thumbnail.image_url + ')'
    }
    return <Link
            to={"/post/" + this.props.id}
            className="post-preview"
            key={this.props.key}
        >
            <div>
                <div className="preview-user-thumbnail">
                    {this.usersImg()}             
                <div className="vote-box">
                    <VoteBox votes={this.props.votes_count} />
                </div>
                </div>   
                <div className="preview-details">
                    <h2 className="post-title">{this.props.name}</h2>
                    <span>{this.props.tagline}</span>
                    <div className="post-thumb cover" style={postThumbStyles}></div>
                </div>
            </div>
        </Link>  
  },
  usersImg: function() {
    var usersImg = this.props.user.image_url['100px'];
    return <img src={usersImg} className="img-circle img-responsive" />
  }
});
