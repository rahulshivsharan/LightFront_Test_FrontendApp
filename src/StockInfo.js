import React from "react";
import ReactDOM from "react-dom";
import jQuery from "jQuery";
import StockChart from "./StockChart";

export default class StockInfo extends React.Component{
	constructor(props){		
		super(props);
		var me = this;		
		me.state = {
			"stockReqObj" : null,
			"stockCode" : me.props.match.params.stockCode,
			"isLoading" : true
		}

		this.getStockInfo = this.getStockInfo.bind(this);		
	}

	componentDidMount(){
		this.getStockInfo(this.state.stockCode)
	}

	componentDidUpdate(nextProps, prevState,snapshot){	
		if(this.props.match.params.stockCode !== nextProps.match.params.stockCode){
			this.getStockInfo(this.props.match.params.stockCode);	
		}
	}

	getStockInfo(selectedStockCode){
		var url = "http://localhost:8187/stock/info/"+selectedStockCode;
		var me = this;
		me.setState({
			"stockReqObj" : null,						
			"isLoading" : true
		});

		jQuery.get(url,function(response){						
			me.setState({
				"stockReqObj" : response,
				"isLoading" : false
			});
		}).fail(function(error){
			console.log("error ",error);
		}).always(function(){
			console.log(" Get Country Info completed ");
		});
	}

	render(){		
		if(this.state.isLoading === true){
			return (
				<div className='spinner-border' role='status'><span className='sr-only'>Loading...</span></div>
			)
		}else{
			return(				
				<div className="row">
					<div className="col-md-2">
						<div className="companySymbol"><img src={this.state.stockReqObj["logo"]} alt={this.state.stockReqObj["name"]} /></div>
					</div>
					<div className="col-md-10">
						<div className="row">
							<div className="col-md-12">
								<table className="table">				
									<tbody>								
										<tr>
											<td align="right">Name</td>
											<td><b>{this.state.stockReqObj["name"]}</b></td>
										</tr>
										<tr>
											<td align="right">Sector</td>
											<td><b>{this.state.stockReqObj["sector"]}</b></td>
										</tr>
										<tr>
											<td align="right">CEO</td>
											<td><b>{this.state.stockReqObj["ceo"]}</b></td>
										</tr>
										<tr>
											<td align="right">Exchange</td>
											<td><b>{this.state.stockReqObj["exchange"]}</b></td>
										</tr>						
									</tbody>
								</table>	
							</div>							
						</div>
						<div className="row">
							<div className="col-md-12">
								<StockChart stockCode={this.state.stockReqObj["symbol"]} />
							</div>
						</div>
					</div>
				</div>				
			)
		}	
				
	}
}