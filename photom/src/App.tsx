import React from "react";
import ReactDOM from "react-dom";
import Header from './fragments/header'

const App = () => (
	<div className="container">
		<Header productName="Module Federation" productVersion="1.2.0" userName="Bruno Ribeiro" />
		<div>Name: photom</div>
		<div>Framework: react</div>
		<div>Language: TypeScript</div>
		<div>CSS: Empty CSS</div>
	</div>
);
ReactDOM.render(<App />, document.getElementById("app"));
