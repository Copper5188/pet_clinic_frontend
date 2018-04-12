
import React    	from 'react';
import ReactDOM 	from 'react-dom';
import { BrowserRouter as Router,Switch,Redirect,Route,Link } from 'react-router-dom'

import Layout  		from 'component/layout/index.jsx';
//页面
import Home     		 from 'page/home/index.jsx';
import Login    		 from 'page/login/index.jsx';
import UserList   		 from 'page/user/index.jsx';
import Disease_kind 	 from 'page/disease_kind/index.jsx';
import Disease_kind_save from 'page/disease_kind/save.jsx';
import Disease_name 	 from 'page/disease_name/index.jsx';

class App extends React.Component{
	render(){
		return(
			<Router>
			<Switch>
				<Route path="/login" component={Login}/>	
				<Route path="/" render={ props => (
					<Layout>
						<Switch>
				    		<Route exact path="/" component={Home}/>
				    		<Route path="/user/index" component={UserList}/>	
				    		<Route path="/disease_kind/index" component={Disease_kind}/>
				    		<Route path="/disease_kind/save"  component={Disease_kind_save}/>
							<Route path="/disease_name/index" component={Disease_name}/>
				    		<Route path="/user/index" component={UserList}/>
							{/* <Route path="/department" component={Homet}/>
							<Route path="/inhospital" component={Home}/>
							<Route path="/medicine" component={Home}/>
							<Route path="/fee" component={Home}/>
							<Route path="/assay" component={Home}/>
							<Route path="/vaccine" component={Home}/> */}
							<Redirect exact from ="/user" to ="/user/index"/>
							
				    	</Switch>
				  	</Layout>

				)}/>
				  	
			</Switch>
			</Router>
			)
	}
}


ReactDOM.render(
   <App />,

  document.getElementById('app')
);