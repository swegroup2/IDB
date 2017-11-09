import React, {Component} from 'react';
import {Tabs, Tab, TabContainer, FormGroup, FormControl} from 'react-bootstrap';

const config = require("./config.json");

/**
 * A loading indicator
 * TODO: make it look cool
 */
export class LoadingStub extends Component {
	render() {
		const message = this.props.message || "Loading...";
		return (
			<div className="alert alert-primary" role="alert">
				{message}
			</div>
		);
	}
}

export class ErrorStub extends Component {
	render() {
		const message = this.props.message || "We ran into an error. Please try again.";
		return (
			<div className="alert alert-danger" role="alert">
				{message}
			</div>
		);
	}
}

/**
 * Abstracts the UI for a list of models with sorted and filtered pages.
 * Requires a prop "itemClass" which is a React component class to render for each item.
 * The component will be given data via its props.data, so it should look there for data.
 *
 * Can be contained within a APIAdapter to connect it to the API.
 */
export class PaginatedList extends Component {
	constructor(props) {
		super(props);

		//TODO: nicer way to do this?
		this.state = {
			sort: 0,
			order: 0,
			filter: 0,
			page: 1
		};

		//load parameters from props
		if (props.hasOwnProperty("sort"))
			this.state.sort = props.sort;
		if (props.hasOwnProperty("order"))
			this.state.order = props.order;
		if (props.hasOwnProperty("filter"))
			this.state.filter = props.filter;
		if (props.hasOwnProperty("page"))
			this.state.page = props.page;

		//map sort/order pair back to sort name
		const sortOptions = this.props.sortOptions || {};
		this.state.sortKey = Object.entries(sortOptions)
			.find(([k,v]) => v.sort === this.state.sort && v.order === this.state.order);
	}

	emitUpdate() {
		if (!this.props.onUpdate)
			return;

		const sortOptions = this.props.sortOptions || {};
		this.props.onUpdate({
			params: {
				page: this.state.page,
				filter: this.state.filter,
				sort: sortOptions[this.state.sortKey].sort,
				order: sortOptions[this.state.sortKey].order
			}
		});
	}

	/**
	 * Renders the HTML interface for displaying sort options
	 */
	renderSortUI() {
		const handler = event => this.setState({sortKey: event.target.value}, this.emitUpdate);

		const sortOptions = this.props.sortOptions || {};
		const renderedOptions = Object.keys(sortOptions)
			.map(k => <option value={k}>{k}</option>);

		return (
			<select className="custom-select mx-1"
			 value={this.state.sortKey} onChange={handler}>
				{renderedOptions}
			</select>
		);
	}

	/**
	 * Renders the HTML interface for displaying filter options
	 */
	renderFilterUI() {
		//TODO: implement

		return (
			<button type="button" className="btn btn-secondary mx-1">Filter</button>
		);
	}

	/**
	 * Renders the HTML interface for displaying pagination buttons
	 */
	renderPageUI() {
		const numPages = this.props.data.total_pages;

		//create numbered page buttons
		let numberedButtons = [];
		for (let i=1; i<=numPages; ++i) {
			const handler = event => this.setState({page: i}, this.emitUpdate);
			const activeClass = this.state.page === i ? "active" : "";
			numberedButtons.push(
				<li className={"page-item " + activeClass} key={i}>
					<span className="page-link" style={{cursor: "pointer"}} onClick={handler}>{i}</span>
				</li>
			);
		}

		return (
			<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					<li className="page-item">
						<a className="page-link" href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</a>
					</li>
					{numberedButtons}
					<li className="page-item">
						<a className="page-link" href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
							<span className="sr-only">Next</span>
						</a>
					</li>
				</ul>
			</nav>
		);
	}

	render() {
		if (!this.props.data)
			throw new Error("PaginatedList requires its data prop to be an array.");
		if (!this.props.itemClass)
			throw new Error("PaginatedList must have itemClass set to a Component.");

		//build UI elements
		const sortUI = this.renderSortUI();
		const filterUI = this.renderFilterUI();
		const pageUI = this.renderPageUI();
		
		//create item instances
		const ItemClass = this.props.itemClass;
		const items = this.props.data.items.map((item, i) => <ItemClass key={i} data={item}/>);

		//compose elements
		return (
			<div className="row">
				<div className="col-12 bg-light d-flex flex-row-reverse">
					{filterUI}
					{sortUI}
				</div>
				<div className="col-12">{pageUI}</div>
				{items}
				<div className="col-12">{pageUI}</div>
		  	</div>
		);
	}
}

/**
 * Wraps a component instance and "connects" it to the API.
 * Could potentially control things other than PaginatedList.
 *
 * A component contained in an APIAdapter should do two things:
 * 1. accept a 'data' prop which is the JSON result of a call to the endpoint
 * 2. accept an 'onUpdate' prop which is a function it should call when the API
 *    needs to be queried again.
 */
export class APIAdapter extends Component {
	constructor(props) {
		super(props);
		this.handleUpdate = this.handleUpdate.bind(this);

		this.state = {
            data: null,
            loaded: false,
            error: false,
            params: this.props.defaultParams || {}
        };
	}

	updateFromAPI() {
		this.setState({loaded: false});
		const queryString = APIAdapter.buildQueryString(this.state.params);

		fetch(`${config.API_URL}/${this.props.endpoint}${queryString}`)
            .then(data => data.json())
            .catch(e => this.setState({error: true}))
            .then(json => {
                this.setState({data: json, loaded: true});
            })
            .catch(e => this.setState({error: true}));
	}

	componentDidMount() {
        this.updateFromAPI();
    }

	handleUpdate({params={}} = {}) {
		this.setState({params: params}, this.updateFromAPI);
	}

	render() {
		if (this.state.error)
			return <ErrorStub />;
		if (!this.state.loaded)
			return <LoadingStub />;

		//update child props by creating a clone of the child with desired props
		const child = React.Children.only(this.props.children);
		const props = {
			data: this.state.data,
			onUpdate: this.handleUpdate
		};

		//render child
		return React.cloneElement(child, Object.assign(props, this.state.params));
	}

	/**
	 * Builds a query string from a dictionary.
	 * e.g. {a: 2, b: 3} -> "?a=2&b=3"
	 */
	static buildQueryString(params={}) {
		if (Object.keys(params).length === 0)
			return "";
		return "?" + Object.keys(params).map(k => `${k}=${params[k]}`).join("&");
	}
}