var path = require("path");
var webpack = require("webpack");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	"entry" : "./src/index.js",
	"output" : {
		"path" : path.resolve("./dist/assets"),
		"filename" : "bundle.js",
		"publicPath" : "assets"
	},
	"devServer": {
    	"historyApiFallback": true,
    	"inline" : true,
    	"contentBase" : "./dist",
    	"port" : 3100
  	},
  	"plugins" : [ new OpenBrowserPlugin({
  			"url" : "http://localhost:3100"
  	})],
	"module" : {
		"rules" : [{
			"test" : /\.js$/,
			"exclude" : /node_modules/,
			"loader" : "babel-loader",
			"query": {
	      		"presets": ['@babel/react', '@babel/preset-env'],
	      		"plugins": ['@babel/proposal-class-properties']
    		}
		},{
    		"test" : /\.css$/,
    		"use" : ['style-loader', 'css-loader']    		
		},{ 
      		"test": /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, 
      		"loader" : 'file-loader' 
      	}]
	}
}