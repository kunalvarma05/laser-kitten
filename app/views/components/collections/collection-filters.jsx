var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            perPageOpen: false,
            categoryOpen: false
        }
    },
    render: function() {
        return <div className="collection-filters">
            {this.renderFeaturedBtn()}
        </div>    
    },
    renderFeaturedBtn: function() {
        console.log('this.state.perPageOpen ' + this.state.perPageOpen);
        return <div className="text-center">
            <ul className="nav nav-pills">
                <li className={this.props.filters.isFeatured ? 'active' : ''}>
                    <a href="#" onClick={this.props.onFeaturedClicked}>Featured</a>
                </li>
                <li className={this.state.perPageOpen ? "dropdown open" : "dropdown"}>
                    <a href="#" className="dropdown-toggle" onClick={this.handlePerPageClick}>
                        <span className="badge">{this.props.filters.perPage}</span> Per Page <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className={this.state.perPageOpen ? "dropdown-menu" : "dropdown-menu hide"}>
                        <li className={this.props.filters.perPage == '10' ? 'active' : ''}>
                            <a href="#" data-per-page="10" onClick={this.handlePPItemClick}>10</a>
                        </li>
                        <li className={this.props.filters.perPage == '25' ? 'active' : ''}>
                            <a href="#" data-per-page="25" onClick={this.handlePPItemClick}>25</a>
                        </li>
                        <li className={this.props.filters.perPage == '50' ? 'active' : ''}>
                            <a href="#" data-per-page="50" onClick={this.handlePPItemClick}>50</a>
                        </li>
                    </ul>
                </li>
                <li className={this.state.categoryOpen ? "dropdown open" : "dropdown"}>
                    <a href="#" className="dropdown-toggle" onClick={this.handleCategoryClick}>
                       Category <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className={this.state.categoryOpen ? "dropdown-menu dropdown-menu-right" : "dropdown-menu dropdown-menu-right hide"}>
                        <li className={this.props.filters.category == 'tech' ? 'active' : ''}>
                            <a href="#" data-category="tech" onClick={this.handleCatItemClick}>Tech</a>
                        </li>
                        <li className={this.props.filters.category == 'games' ? 'active' : ''}>
                            <a href="#" data-category="games" onClick={this.handleCatItemClick}>Games</a>
                        </li>
                        <li className={this.props.filters.category == 'podcasts' ? 'active' : ''}>
                            <a href="#" data-category="podcasts" onClick={this.handleCatItemClick}>Postcasts</a>
                        </li>
                        <li className={this.props.filters.category == 'books' ? 'active' : ''}>
                            <a href="#" data-category="books" onClick={this.handleCatItemClick}>Books</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    },
    handlePerPageClick: function(e) {
        e.preventDefault();
        this.setState({
            perPageOpen: !this.state.perPageOpen,
            categoryOpen: false
        });      
    },
    handlePPItemClick: function(e) {
        e.preventDefault();
        this.setState({
            perPageOpen: false
        });
        var perPage = e.currentTarget.getAttribute('data-per-page');
        this.props.onPerPageClicked(perPage);
    },
    handleCategoryClick: function(e) {
        e.preventDefault();
        this.setState({
            perPageOpen: false,
            categoryOpen: !this.state.categoryOpen
        });      
    },
    handleCatItemClick: function(e) {
        e.preventDefault();
        this.setState({
            categoryOpen: false
        });
        var category = e.currentTarget.getAttribute('data-category');
        this.props.onCategoryClicked(category);
    }
});
