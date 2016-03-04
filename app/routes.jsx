var React = require('react');
var ReactRouter = require('react-router');
// var HashHistory = require('react-router/lib/hashhistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;

var Main = require('./views/main');
var Posts = require('./views/posts');
var Post = require('./views/post');
var Collections = require('./views/collections');
var Collection = require('./views/collection');
var Notifications = require('./views/notifications');
var User = require('./views/user');
var Search = require('./views/search');


module.exports = (
  <Router>
    <Route path="/" component={Main}>
        <Route path="posts" component={Posts} />
        <Route path="posts/category/:id" component={Posts} />
        <Route path="post/:id" component={Post} />
        <Route path="collections" component={Collections} />
        <Route path="collection/:id" component={Collection} />
        <Route path="notifications" component={Notifications} />
        <Route path="user" component={User} />
        <Route path="user/:id" component={User} />
        <Route path="search" component={Search} />
    </Route>
  </Router>
)