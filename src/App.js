import React from "react";
import ReactDOM from "react-dom";
import DefaultView from "./DefaultView";
import SearchStockPanel from "./SearchStockPanel";
import {BrowserRouter,Route,Link} from "react-router-dom";



export default class App extends React.Component{			   				
	render (){
	    return (
			<BrowserRouter>
				<div>
					<div className="container-fluid">
						<nav className="navbar navbar-expand-lg navbar-light bg-light">
							<Link className="navbar-brand" to="/StockDashboard">Stock Dashboard</Link>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarForStockDashboard" aria-controls="navbarForStockDashboard" aria-expanded="false" aria-label="Toggle navigation">
    							<span className="navbar-toggler-icon"></span>
  							</button>			
  							<div className="collapse navbar-collapse" id="navbarForStockDashboard">
  								<ul className="navbar-nav">
  									<li className="nav-item">
     									<Link className="nav-link" to="/StockDashboard/searchStock">Search Stock</Link>
      								</li>      								
  								</ul>
  							</div>
						</nav>
						<div className="row">
							<div className="col-md-12">																				
								<Route exact path="/StockDashboard" component={DefaultView} />								
								<Route exact path="/StockDashboard/searchStock" component={SearchStockPanel} />
							</div>
						</div>
					</div>
				</div>	
			</BrowserRouter>
		)
	}
};