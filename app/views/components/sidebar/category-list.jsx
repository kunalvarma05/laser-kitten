// var React = require('react');
// var Reflux = require('reflux');
// var CategoryStore = require('../../stores/category-store');
// var Actions = require('../../actions');
// var ReactRouter = require('react-router');
// var Link = ReactRouter.Link;

// module.exports = React.createClass({
//     mixins: [
//         Reflux.listenTo(CategoryStore, 'onChange')
//     ],
//     getInitialState: function() {
//         return {
//             categories: []
//         }
//     },
//     componentWillMount: function() {
//         Actions.getCategories();
//     },
//     render: function() {
//         return  <nav className="categories">
//             <ul className="list-unstyled">         
//                 {this.renderCategories()}
//             </ul>
//         </nav>
//     },
//     renderCategories: function() {
//         return this.state.categories.map(function(category) {
//             return <li>
//                 <Link className="nav-group-item" to={"/posts/category/" + category.id} key={category.id}>
//                     <span className="icon icon-home"></span>
//                     {category.name}
//                 </Link>
//             </li>
//         });
//     },
//     onChange: function(event, categories) {
//         this.setState({categories: categories});
//     }
// });