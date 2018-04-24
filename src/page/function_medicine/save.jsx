import React    		  	from 'react';
import Nutil        		from 'util/nn.jsx';
import FunctionM    		from 'service/function_medicine-service.jsx';


const _nn         = new Nutil();
const _functionm  = new FunctionM();
class FunctionMedicineSave extends React.Component{
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
		let functionmedicine ={
			medicine_name   : this.state.medicine_name,
			medicine_des : this.state.medicine_des,
			//id :this.state.secondCategoryID
		};
		_functionm.saveFunctionm(functionmedicine).then((res)=> {
			alert('上传成功');
			this.props.history.push('/function_medicine/index');
		})
	}
	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加药品信息
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">药品名称</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="请输入药品名称"
					    	name="medicine_name"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>

						<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">药品描述</label>
					    <div className="col-md-5">
					      <textarea rows='8' type="text" className="form-control" placeholder="请输入药品描述"
					    	name="medicine_des"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
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

export default FunctionMedicineSave;