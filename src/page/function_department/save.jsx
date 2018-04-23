import React    			from 'react';
import Nutil        		from 'util/nn.jsx';
import FunctionD    		from 'service/function_department-service.jsx';


const _nn         = new Nutil();
const _functiond  = new FunctionD();
class FunctionDepartmentSave extends React.Component{
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
		let functiondepartment ={
			dpm_name : this.state.dpm_name,
			dpm_des 	: this.state.dpm_des
			//id :this.state.secondCategoryID
		};
		_functiond.saveFunctiond(functiondepartment).then((res)=> {
			alert('上传成功');
			this.props.history.push('/function_department/index');
		})
	}
	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加科室
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">科室名称</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="请输入科室名称"
					    	name="dpm_name"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">科室描述</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入科室描述"
					      name="dpm_des"
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

export default FunctionDepartmentSave;