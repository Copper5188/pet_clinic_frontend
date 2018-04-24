import React    		  	from 'react';
import Nutil        		from 'util/nn.jsx';
import FunctionA    		from 'service/function_assay-service.jsx';


const _nn         = new Nutil();
const _functiona  = new FunctionA();
class FunctionAssaySave extends React.Component{
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
		let functionassay ={
			assay_name   : this.state.assay_name,
			//id :this.state.secondCategoryID
		};
		_functiona.saveFunctiona(functionassay).then((res)=> {
			alert('上传成功');
			this.props.history.push('/function_assay/index');
		})
	}
	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加化验项目名称
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">化验项目名称</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="请输入化验项目名称"
					    	name="assay_name"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>

						{/* // <div className="form-group">
					  //   <label className="col-md-2 control-label">化验项目描述</label>
					  //   <div className="col-md-5">
					  //     <textarea col="10" type="text" className="form-control" placeholder="请输入化验项目名称"
					  //   	name="assay_des"
					  //   	onChange={(e) => this.onValueChange(e)}/>
					  //   </div>
					  // </div> */}

	
					 
					 

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

export default FunctionAssaySave;