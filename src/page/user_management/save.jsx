import React    			from 'react';
import Nutil        		from 'util/nn.jsx';
import UserM     		from 'service/user_management-service.jsx';


const _nn         = new Nutil();
const _userm   = new UserM();
class UserManagementSave extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name    	: ' ',
			subtitle 	: ' ',

		}
	}
	onValueChange(e){
		let name =e.target.name,
		    value=e.target.value.trim();
		    this.setState({
		    	[name] : value
		    });

	}
	onCategoryChange(categroyId){
		console.log('categroyId',categroyId);
	}

	onSubmit(){
		let usermanagement ={
			username  : this.state.username,
			password 	: this.state.password,
			authority : this.state.authority
			//id :this.state.secondCategoryID
		};
		_userm.saveUserm(usermanagement).then((res)=> {
			alert('上传成功');
			this.props.history.push('/user_management/index');
		})
	}
	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加用户
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">用户名</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="请输入用户名"
					    	name="username"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">用户密码</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入用户密码"
					      name="password"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
						<div className="form-group">
					    <label className="col-md-2 control-label">用户身份</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入用户身份"
					      name="authority"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					 

					  <div className="form-group">
					    <div className="col-md-offset-2 col-md-10">
					      <button type="submit" className="btn btn-primary" 
					      onClick={(e)=> {this.onSubmit(e)}}>提交</button>
					    </div>
					  </div>
					</div>
            </div>
		)
	}
}

export default UserManagementSave;