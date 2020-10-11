import React from "react";
import ReactDOM from "react-dom";
import Autocomplete from "react-autocomplete";
import jQuery from "jQuery";

export default class SearchCountry extends React.Component{
	constructor(props){
		super(props);		
		this.state = {
			"selectedStock" : "",
			"stockList" : []
		}
		
		this.loadStockList = this.loadStockList.bind(this);
		this.loadStockInfo = this.loadStockInfo.bind(this);
	}

	loadStockList(e){
		console.log(e.target.value);
		var url = "http://localhost:8187/stock/list/"+e.target.value;
		var me = this;
		
		if(e.target.value !== ""){
			jQuery.get(url,function(response){						
				me.setState({
					"stockList" : response["tickers"]				
				});
			}).fail(function(error){
				console.log("error ",error);
			}).always(function(){
				console.log(" Get Stock List is completed ");
			});

			this.setState({
				"selectedStock" : e.target.value
			});
		}else{
			me.setState({
				"stockList" : [],
				"selectedStock" : ""				
			});
		}
	} // end of loadStoackList

	loadStockInfo(val){
		console.log(val);		
		var me = this;
		me.setState({
			"selectedStock" : val
		});
		var url = "/StockDashboard/searchStock/"+val;
		me.props.history.push(url);
	}

	render(){
		return (
			<Autocomplete 	className="form-control"	
							getItemValue={(item) => item.ticker}
							items={this.state.stockList} 
							renderItem={(item,isHighlighted) => 
								<div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item.ticker}>
      								{item.name}
    							</div>
							}
							value={this.state.selectedStock}
							onChange={this.loadStockList} 
							onSelect={this.loadStockInfo} /> 
		)
	}
}