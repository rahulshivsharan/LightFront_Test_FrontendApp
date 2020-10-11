import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter,Route} from "react-router-dom";

export default class DefaultView extends React.Component{
	constructor(props){
		super(props);		
	}
	render (){
		return (
			<div className="jumbotron jumbotron-fluid">
				<h1 className="display-4">Stock DashBoard</h1>
			</div>	
		)
	}
}; 