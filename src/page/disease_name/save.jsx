import React    			    from 'react';
import Nutil        		  from 'util/nn.jsx';
import DiseaseN     	   	from 'service/disease_name-service.jsx';
import CategorySelector 	from './category-selector.jsx';


const _nn         = new Nutil();
const _diseasen   = new DiseaseN();
class DiseaseNameSave extends React.Component{
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
		alert('categroyId',categroyId);
	}

	onSubmit(){
		alert($('#sd').val())
		let diseasename ={
			diname_name : this.state.diname_name,
			diname_des 	: this.state.diname_des,
		  dikind_id   : document.getElementById('firstCategoryId').value
			//id :this.state.secondCategoryID
		};
    alert(this.state.firstCategoryID)
		_diseasen.saveDiseasen(diseasename).then((res)=> {
			alert('信息上传成功');
			this.props.history.push('/disease_name/index');
		})
	}
	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加病名
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">病名名称</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="请输入病种名称"
					    	name="diname_name" id="sd"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">病名描述</label>
					    <div className="col-md-5">
							<textarea rows="8"  className="form-control"  
					      placeholder="请输入病种描述"
					      name="diname_des"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>

					  <div className="form-group">
					    <label className="col-md-2 control-label">所属病种</label>
					    <CategorySelector  onCategoryChange={(categroyId) => this.onCategoryChange(categroyId)}/>
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

export default DiseaseNameSave;