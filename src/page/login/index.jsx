import React 	  from 'react';
import Mutil      from 'util/mm.jsx';
import User       from 'service/user-service.jsx'

const _mm 	= new Mutil();
const _user = new User();
import './index.scss';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:'',
			
		}
    }

//当用户名发生改变
	onInputChange(e){
		let inputValue = e.target.value,
			inputName  = e.target.name;
		
		this.setState({
			[inputName] : inputValue
		});
	}
//当用户提交表单
	onSubmit(){
		_user.login({
			data:{
       			username : this.state.username,
       			password : this.state.password
       		}
		})
{/*  .then((res) => {
       	    //console.log(this.state.redirect);
       	       	 	//this.props.history.push(this.state.index)
       },(errMsg) => {
            _mm.errorTips(errMsg);
       });
*/}
	}
	
	render(){
		return(
 				<div className="col-md-4 col-md-offset-4">
					<div className="panel panel-default login-panel">
					  <div className="panel-heading">欢迎登录-宠物医院管理系统</div>
				   		 <div className="panel-body">
							<div>
							   <div className="form-group">
							  	  <label htmlFor="exampleInputEmail1">用户名</label>
							  	  <input type="text" 
							  	  		 name="username"
							  	  		 className="form-control"  
							  	  		 placeholder="请输入用户名" 
							  	  		 onChange={e => this.onInputChange(e)}/>
							  </div>
							  <div className="form-group">
							  	  <label htmlFor="exampleInputPassword1">密码</label>
							      <input type="password" 
 										 name="password"
 							      		 className="form-control"  
							      		 placeholder="请输入密码"
							      		 onChange={e => this.onInputChange(e)}/>
							  </div>
							      <button className="btn btn-lg btn-block btn-primary"
							              onClick={e => {this.onSubmit(e)}}>登录</button>
							</div>
				    	 </div>
					</div>
 				</div>
		);
	}
}

export default Login;