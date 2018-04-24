import React    			from 'react';
import Nutil        		from 'util/nn.jsx';
import DiseaseC     		from 'service/disease_case-service.jsx';
import CategorySelector 	from './category-selector.jsx';


const _nn         = new Nutil();
const _diseasec   = new DiseaseC();
class DiseaseCaseSave extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name    	: ' ',
			subtitle 	: ' ',

		}
	}

	uploadPIC(e){
		this.setState({formData: new FormData(e)})
		//let formData = new FormData(e);
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
		alert($('#sd').val())
		console.log(this.state.formData)
		let diseasecase ={
			dicase_name : this.state.dicase_name,
			dicase_des 	: this.state.dicase_des,
			//id :this.state.secondCategoryID
		};

		let formData = new FormData();
		formData.append("video",				document.getElementById('video').files[0]);
		formData.append("file",					document.getElementById('pic').files[0]);
		formData.append("dicase_name",	document.getElementById('dicase_name').value);
		formData.append("treatment_des",document.getElementById('treatment_des').value);
		formData.append("diagnosis_des",document.getElementById('diagnosis_des').value);
		formData.append("diname_id",		document.getElementById('secondCategoryId').value);

		_diseasec.uploadPIC(formData).then((res)=> {
			alert('信息上传成功');
			this.props.history.push('/disease_case/index');
		})
	}


	imagepreivew(){
      var file = $('#pic').get(0).files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=function(e){
        console.log(e);
        $('#imgshow').get(0).src = e.target.result;
      };
		}

		videopreivew(){
      var file = $('#video').get(0).files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=function(e){
        console.log(e);
        $('#videoshow').get(0).src = e.target.result;
      };
		}
		
		
	

	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加病例
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">病例名称</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="请输入病种名称"
					    	name="dicase_name" id="dicase_name"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">诊断描述</label>
					    <div className="col-md-5">
					      <textarea rows='5' className="form-control"  
					      placeholder="请输入诊断描述"
								name="diagnosis_des"
								id="diagnosis_des"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
						</div>
							<div className="form-group">
					    <label className="col-md-2 control-label">治疗描述</label>
					    <div className="col-md-5">
							  <textarea rows='8'  className="form-control"  
					      placeholder="请输入治疗描述"
								name="treatment_des"
								id="treatment_des"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					 <div className="form-group">
					    <label className="col-md-2 control-label">所属病种</label>
					    <CategorySelector onCategoryChange={(categroyId) => this.onCategoryChange(categroyId)}/>
					  </div>
					  



					  <div className="form-group" >
					  	<label className="col-md-2 control-label">病例图片</label>
					  	<div className="col-md-5">
    					<img  id="imgshow" src="" alt="" width="100%"/>
							<form id="uploadForm"  onChange={(e) => this.uploadPIC(e)}
																		 onChange={(e) => this.imagepreivew(e)}>
								<input type="file" name="file" id="pic" />
              </form>
					  	</div>
					 	</div>

					 <div className="form-group" >
					  	<label className="col-md-2 control-label">病例视频</label>
					  	<div className="col-md-5">
							<video id="videoshow" src="" alt="" width="100%"/>
							<form id= "uploadForm" onChange={(e) => this.uploadPIC(e)}
																		 onChange={(e) => this.videopreivew(e)}>
								<input type="file" name="file" id="video" />
              </form>
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

export default DiseaseCaseSave;