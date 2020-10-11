import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter,Route,withRouter} from "react-router-dom";
import SearchStockInputBox from "./SearchStockInputBox";
import jQuery from "jQuery";
import StockInfo from "./StockInfo";


var SearchInputBox = withRouter(SearchStockInputBox);

export default class SearchStockPanel extends React.Component{
	render(){
		return (
			<BrowserRouter>
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-4">
								<form id="stockSearchForm">
									<div className="form-group row">
										<label htmlFor="countryNameTxt" className="col-sm-3 col-form-label">Search Company</label>
										<div className="col-md-12">									
											<SearchInputBox />
										</div>
									</div>
								</form>
							</div>							
						</div>
						<div className="row">
							<div className="col-md-12">
								<Route exact path="/StockDashboard/searchStock/:stockCode" component={StockInfo} />
							</div>
						</div>		
					</div>
				</div>
				
			</BrowserRouter>
		)
	}
}	