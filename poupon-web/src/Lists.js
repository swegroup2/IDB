import React, {Component} from "react";
import LoadingStub from "./Components.js";

const config = require("./config.json");

/**
 * Abstracts the UI for a list of models with sorted and filtered pages.
 * Requires a prop "itemClass" which is a React component class to render for each item.
 * The component will be given data via its props.data, so it should look there for data.
 *
 * Can be contained within a ModelController to connect it to the API.
 */
export class PaginatedList extends Component {
	constructor(props) {
		super(props);

		//use prop instead?
		this.state = {
			sortValue: this.props.sortValue,
			filterValue: this.props.filterValue,
			pageValue: this.props.pageValue
		};
	}

	/**
	 * Renders the HTML interface for displaying sort options
	 */
	renderSortUI() {
		const handler = event => this.setState({sortValue: event.target.value});

		return (
			<select className="custom-select mx-1"
			 value={this.state.sortValue} onChange={handler}>
				<option value="0">Most popular</option>
				<option value="1">Least popular</option>
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
		const numPages = 3;

		//create numbered page buttons
		let numberedButtons = [];
		for (let i=1; i<=numPages; ++i) {
			const handler = event => this.setState({pageValue: i});
			const activeClass = this.state.pageValue === i ? "active" : "";
			numberedButtons.push(
				<li className={"page-item " + activeClass}>
					<span className="page-link" onClick={handler}>{i}</span>
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
		//build UI elements
		const sortUI = this.renderSortUI();
		const filterUI = this.renderFilterUI();
		const pageUI = this.renderPageUI();

		//create item instances
		if (!this.props.data)
			throw new Error("PaginatedList requires that its data prop be set.");
		const ItemClass = this.props.itemClass;
		const items = this.props.data.map((item, i) => <ItemClass key={i} data={item}/>);

		//compose elements
		return (
			<div className="row">
				<div className="col-12 bg-light d-flex flex-row-reverse">
				{filterUI}
				{sortUI}
				</div>
				<div className="col-12">
				{pageUI}
				</div>
				{items}
				<div className="col-12">
				{pageUI}
				</div>
		  	</div>
		);
	}
}

/**
 * Wraps a PaginatedList instance and "connects" it to the API.
 * Could potentially control things other than PaginatedList.
 */
export class ModelController extends Component {
	constructor(props) {
		super(props);
		this.handleUpdate.bind(this);

		this.state = {
            data: null,
            loaded: false,
            error: false
        };
	}

	componentDidMount() {
        fetch(`${config.API_URL}/${this.props.endpoint}`)
            .then(data => data.json())
            .then(json => {
                this.setState({data: json, loaded: true});
            })
            .catch(e => {
            	this.setState({error: true});
            });
    }

	handleUpdate(event) {
		console.log("da ting go skrraa");
	}

	render() {
		//todo: handle error
		if (!this.state.loaded)
			return <LoadingStub />;

		if (!this.props.children)
			throw new Error(`ModelController must have exactly one child.`);

		//update child props and render child
		const child = React.Children.only(this.props.children);
		const props = {
			data: this.state.data,
			onUpdate: this.handleUpdate
		};
		return React.cloneElement(child, props);
	}
}

// class ExampleArtistsPage extends Component {
// 	render() {
// 		return (
// 			<ModelController endpoint="artists">
//                 <PaginatedList itemClass={ArtistPreviewCard}/>
//             </ModelController>
// 		);
// 	}
// }