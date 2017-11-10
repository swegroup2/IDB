import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';

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
		const params = props.params || {};
		if (params.hasOwnProperty("sort"))
			this.state.sort = params.sort;
		if (params.hasOwnProperty("order"))
			this.state.order = params.order;
		if (params.hasOwnProperty("filter"))
			this.state.filter = params.filter;
		if (params.hasOwnProperty("page"))
			this.state.page = params.page;

		//map sort/order pair back to sort name
		const sortOptions = this.props.sortOptions || {};
		const sortKey = Object.entries(sortOptions)
			.find(([k,v]) => v.sort === this.state.sort && v.order === this.state.order);
		if (sortKey)
			this.state.sortKey = sortKey[0];
		else
			this.state.sortKey = Object.keys(sortOptions)[0];
	}
	
	emitUpdate() {
		if (!this.props.onUpdate)
			return;

		if (!this.props.sortOptions) {
			this.props.onUpdate({
				params: {
					page: this.state.page,
					filter: this.state.filter
				}
			});
		}
		else {
			const sortOptions = this.props.sortOptions;
			this.props.onUpdate({
				params: {
					page: this.state.page,
					filter: this.state.filter,
					sort: sortOptions[this.state.sortKey].sort,
					order: sortOptions[this.state.sortKey].order
				}
			});
		}
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
		const filterOptions = this.props.filterOptions || {};
		const renderedOptions = Object.keys(filterOptions).map(k => {
			const options = filterOptions[k].map(v => 
				<option value={v}>{v}</option>);
			return (
				<div>
				<span>{k}: </span>
				<select>{options}</select>
				</div>
			);
		});

		const applyHandler = event => {};

		return (
			<div>
			<button type="button" className="btn btn-secondary mx-1" 
			 data-toggle="modal" data-target="#filterModal">Filter...</button>

			<div className="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="filterModalLabel" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="filterModalLabel">Filter options</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        {renderedOptions}
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
			        <button type="button" className="btn btn-primary" onClick={applyHandler}>Apply</button>
			      </div>
			    </div>
			  </div>
			</div>
			</div>
		);
	}

	/**
	 * Renders the HTML interface for displaying pagination buttons
	 */
	renderPageUI() {
		const numPages = this.props.data.total_pages;
		const handler = event => this.setState({page: event.selected + 1}, this.emitUpdate);

		return (
			<ReactPaginate previousLabel={"<<"}
						   previousClassName={"page-item"}
						   previousLinkClassName={"page-link"}
			               nextLabel={">>"}
			               nextClassName={"page-item"}
						   nextLinkClassName={"page-link"}
			               breakLabel={<span className="page-link">...</span>}
			               breakClassName={"page-item"}
			               forcePage={this.state.page-1}
                       	   pageCount={numPages}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={handler}
                           containerClassName={"pagination justify-content-center"}
                           pageClassName={"page-item"}
                           pageLinkClassName={"page-link"}
                           activeClassName={"active"} />

		);
	}

	render() {
		if (!this.props.data)
			throw new Error("PaginatedList requires its data prop to be an array.");
		if (!this.props.itemClass)
			throw new Error("PaginatedList must have itemClass set to a Component.");

		//build UI elements
		let sortFilterUI = null;
		if (!this.props.hideSortFilter) {
			sortFilterUI = (
				<div className="col-12 bg-light d-flex flex-row-reverse">
					{this.renderSortUI()}
					{this.renderFilterUI()}
				</div>
			);
		}
		const pageUI = this.renderPageUI();
		
		//create item instances
		const ItemClass = this.props.itemClass;
		const itemProps = this.props.itemProps || {};
		const items = this.props.data.items.map((item, i) => <ItemClass key={i} data={item} {...itemProps}/>);

		//compose elements
		return (
			<div className="row">
				{sortFilterUI}
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
 *    It can pass some information to the onUpdate callback. Namely, an object containing:
 *      params: a {name: value} map that will be converted to query parameters
 *    When the APIAdapter renders its child component, it will pass params back
 *    to it as a prop. The child component can use this to decide how to render itself.
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

	updateFromAPI(altProps={}) {
		const props = Object.assign({}, this.props, altProps);

		this.setState({loaded: false});
		const queryString = APIAdapter.buildQueryString(this.state.params);

		fetch(`${config.API_URL}/${props.endpoint}${queryString}`)
            .then(data => data.json())
            .catch(e => this.setState({error: true}))
            .then(json => {
                this.setState({data: json, loaded: true});
            })
	}

	componentWillReceiveProps(nextProps) {
		this.updateFromAPI(nextProps);
	}

	componentDidMount() {
        this.updateFromAPI();
    }

	handleUpdate({params={}} = {}) {
		this.setState({params}, this.updateFromAPI);
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
			onUpdate: this.handleUpdate,
			params: Object.assign({}, this.state.params)
		};

		//render child
		return React.cloneElement(child, props);
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