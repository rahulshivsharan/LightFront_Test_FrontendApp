import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import {Chart} from "react-charts";
import jQuery from "jQuery";
import moment from "moment";

export default function StockChart(props){		
	var stockCode = props["stockCode"];
	
	var [myData,setMyData] = useState([		
		{"label" : "Opening Value" , "data" : [] },
		{"label" : "Closing Value" , "data" : [] },
		{"label" : "High" , "data" : [] },
		{"label" : "Low" , "data" : [] }
	]); 

	

	var [myAxes,setMyAxes] = useState(
		[
			{
				'primary': true, 
				'type': 'utc', 
				'position': 'bottom',
				'show': 'primaryAxisShow'
			},
			{					
				'type': 'linear', 
				'position': 'left',
				'show': 'secondaryAxisShow'
			}
		],
		['primaryAxisShow','secondaryAxisShow']
	);
	


	var url = "http://localhost:8187/stock/range/"+stockCode;
		
									
	jQuery.get(url,function(response){						
		console.log(" Response loaded "+response["results"].length);
		var results = response["results"];
			
			var mkData = [				
				{"label" : "Opening Value" , "data" : [] },
				{"label" : "Closing Value" , "data" : [] },
				{"label" : "High" , "data" : [] },
				{"label" : "Low" , "data" : [] }
			];

			var mkAxes = [
				{
					'primary': true, 
					'type': 'utc', 
					'position': 'bottom',
					'show': 'primaryAxisShow'

				},
				{					
					'type': 'linear', 
					'position': 'left',				
					'show': 'secondaryAxisShow'
				}
			];

			jQuery.each(results,function(index,stockObj){
				var timestamp = stockObj['t'];
				
				var open = stockObj['o'];
				var close = stockObj['c'];
				var high = stockObj['h'];
				var low = stockObj['l'];				
				var dateString = moment(timestamp).format("DD/MM/YYYY");
				var momentObj = moment(dateString,"DD/MM/YYYY");
				var dateObj = momentObj.toDate();
				var time = dateObj.getTime();
				var utc_val = momentObj.utc();

				mkData[0]["data"].push([utc_val,open]); // Open Value
				mkData[1]["data"].push([utc_val,close]); // Close Value
				mkData[2]["data"].push([utc_val,high]); // High
				mkData[3]["data"].push([utc_val,low]); // low

			});

			console.log(mkData);

			setMyData(mkData);
			setMyAxes(mkAxes);
			


		}).fail(function(error){
					console.log("error ",error);
		}).always(function(){
					console.log(" Get Stock Info completed ");
		});

		
			
	
	
	return(<div style={{
        		width: '1600px',
        		height: '300px'
      		}}>
      			<Chart  data={myData} axes={myAxes} tooltip />
      		</div>)
	
}
