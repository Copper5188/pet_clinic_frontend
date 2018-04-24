
import React    		 from 'react';
import ReactDOM 		 from 'react-dom';
import { BrowserRouter as Router,Switch,Redirect,Route,Link } from 'react-router-dom'

import Layout  			 from 'component/layout/index.jsx';
//页面
import Home     		 from 'page/home/index.jsx';
import Login    		 from 'page/login/index.jsx';
import UserList   		 from 'page/user_management/index.jsx';
import Disease_kind 	 from 'page/disease_kind/index.jsx';
import Disease_kind_save from 'page/disease_kind/save.jsx';
import Disease_kind_edit from 'page/disease_kind/edit.jsx';

import User_management 	     from 'page/user_management/index.jsx';
import User_management_save  from 'page/user_management/save.jsx';
import User_management_edit  from 'page/user_management/edit.jsx';
import Function_department 	     from 'page/function_department/index.jsx';
import Function_department_save  from 'page/function_department/save.jsx';
import Function_department_edit  from 'page/function_department/edit.jsx';

import Function_inhospital 	     from 'page/function_inhospital/index.jsx';
import Function_inhospital_save  from 'page/function_inhospital/save.jsx';
import Function_inhospital_edit  from 'page/function_inhospital/edit.jsx';
import Exam_question 	  from 'page/exam_question/index.jsx';
import Exam_question_save from 'page/exam_question/save.jsx';
import Exam_question_edit from 'page/exam_question/edit.jsx';

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

				    		<Route path="/disease_kind/index" component={Disease_kind}/>
				    		<Route path="/disease_kind/save"  component={Disease_kind_save}/>
				    		<Route path="/disease_kind/edit/:dkid"  component={Disease_kind_edit}/>
							<Route path="/disease_name/index" component={Disease_name}/>

                            <Route path="/user_management/index" component={User_management}/>
				    		<Route path="/user_management/save"  component={User_management_save}/>
				    		<Route path="/user_management/edit/:usid"  component={User_management_edit}/>
							<Route path="/function_department/index" component={Function_department}/>
				    		<Route path="/function_department/save"  component={Function_department_save}/>
				    		<Route path="/function_department/edit/:dpmid"  component={Function_department_edit}/>

							<Route path="/function_inhospital/index" component={Function_inhospital}/>
				    		<Route path="/function_inhospital/save"  component={Function_inhospital_save}/>
				    		<Route path="/function_inhospital/edit/:stid"  component={Function_inhospital_edit}/>
							<Route path="/exam_question/index" component={Exam_question}/>
				    		<Route path="/exam_question/save"  component={Exam_question_save}/>
				    		<Route path="/exam_question/edit/:tsid"  component={Exam_question_edit}/>
				    

				    		<Route path="/disease_name/index" component={Disease_name}/>
				  
				    		
							{/* <Route path="/department" component={Homet}/>
							<Route path="/inhospital" component={Home}/>
							<Route path="/medicine" component={Home}/>
							<Route path="/fee" component={Home}/>
							<Route path="/assay" component={Home}/>
							<Route path="/vaccine" component={Home}/> */}
							<Redirect exact from ="/user" to ="/user_management/index"/>
							
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