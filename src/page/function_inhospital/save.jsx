import React    		  	from 'react';
import Nutil        		from 'util/nn.jsx';
import FunctionI    		from 'service/function_inhospital-service.jsx';


const _nn         = new Nutil();
const _functioni  = new FunctionI();
class FunctionInhospitalSave extends React.Component{
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
		let functioninhospital ={
			patient_name   : this.state.patient_name,
			stay_starttime : this.state.stay_starttime,
			stay_endtime   : this.state.stay_endtime,
			//id :this.state.secondCategoryID
		};
		_functioni.saveFunctioni(functioninhospital).then((res)=> {
			alert('上传成功');
			this.props.history.push('/function_inhospital/index');
		})
	}
	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加住院信息
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">病人姓名</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="请输入病人姓名"
					    	name="patient_name"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">入院时间</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入入院时间yyyy-mm-dd"
					      name="stay_starttime"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
						<div className="form-group">
					    <label className="col-md-2 control-label">出院时间</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入出院时间yyyy-mm-dd"
					      name="stay_endtime"
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

export default FunctionInhospitalSave;