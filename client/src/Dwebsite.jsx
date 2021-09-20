import React from 'react';
import {Route,Switch} from "react-router-dom";
import Dsignin from "./Dsignin";
import Dlogin from "./Dlogin";
import Mysqltest from "./Mysqltest";


const Dwebsite=()=>{
	return(<>
		<Switch>
			
			<Route exact path="/" component={Dsignin}/>
			<Route exact path="/signup" component={Dsignin}/>
			<Route exact path="/login" component={Dlogin}/>
			<Route exact path="/mysqlapp" component={Mysqltest}/>

		</Switch>
	</>);
}

export default Dwebsite;
