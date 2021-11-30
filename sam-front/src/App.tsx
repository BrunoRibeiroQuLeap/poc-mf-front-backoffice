import React from "react";
import ReactDOM from "react-dom";

import { HeaderTypes } from 'photom/src/types'
import Header from 'photom/Header';
import { Button } from '@material-ui/core'

const SamHeader = Header as HeaderTypes

const App = () => (
	<div className="container">
		<SamHeader productName="Module Federation 2" productVersion="1.3.0" userName="Bruno Ribeiro" />
		<Button variant="contained">It is working</Button>
		<div>Name: Sam Front</div>
		<div>Framework: React</div>
		<div>Language: TypeScript</div>
		<div>CSS: Empty CSS</div>
	</div>
);
ReactDOM.render(<App />, document.getElementById("app"));
