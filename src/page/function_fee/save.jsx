import React    		  	from 'react';
import Nutil        		from 'util/nn.jsx';
import FunctionF    		from 'service/function_fee-service.jsx';


const _nn         = new Nutil();
const _functionf  = new FunctionF();
class FunctionFeeSave extends React.Component{
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
		let functionfee ={
			pay_name     : this.state.pay_name,
			pay_amount   : this.state.pay_amount,
			//id :this.state.secondCategoryID
		};
		_functionf.saveFunctionf(functionfee).then((res)=> {
			alert('上传成功');
			this.props.history.push('/function_fee/index');
		})
	}
	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加收费信息
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">收费名称</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="收费名称"
					    	name="pay_name"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>

					  <div className="form-group">
					    <label className="col-md-2 control-label">收费金额</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="收费金额"
					    	name="pay_amount"
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

export default FunctionFeeSave;