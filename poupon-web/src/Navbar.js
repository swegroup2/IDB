import React, { Component } from 'react';

class Navbar extends Component {
	render() {
		//todo: move this?
		const tabs = [
			{name: "Home", href: "/"},
			{name: "Artists", href: "/artists"}
		];

		//generate navigation tabs
		let navtabs = tabs.map(data => {
			//figure out what css classes to use
			let classes = ["navbar-item"];
			if (document.location.pathname === data.href)
				classes.push("active");

			return <li className={classes.join(" ")} key={data.name}>
			        <a className="nav-link" href={data.href}>{data.name}</a>
			       </li>
		});

		//render navbar template
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <a className="navbar-brand" href="#">Poupon</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      {navtabs}
			    </ul>
			    <form className="form-inline my-2 my-lg-0">
			      <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"></input>
			      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
			    </form>
			  </div>
			</nav>
		);
	}
}

export default Navbar;