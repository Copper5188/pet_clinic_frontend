import React    			from 'react';
import Nutil        		from 'util/nn.jsx';
import DiseaseK     		from 'service/disease_kind-service.jsx';
import CategorySelector 	from './category-selector.jsx';


const _nn         = new Nutil();
const _diseasek   = new DiseaseK();
class DiseaseKindSave extends React.Component{
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
		let diseasekind ={
			dikind_name : this.state.dikind_name,
			dikind_des 	: this.state.dikind_des,
			//id :this.state.secondCategoryID
		};
		
		//上传图片
		//function doUpload() {
    	//	var formData = new FormData($("#uploadForm")[0]);  
    	//	$.ajax({  
        //		url: 'http://localhost:9001/uploadImg',
        //		type: 'POST',  
        //		data: formData,  
        //		cache: false,  
        //		contentType: false,  
        //		processData: false,  
        //		success: function (returndata) {  
        //    		console.log(returndata);  
        //		},
        //		error: function (returndata) {  
        //    		console.log(returndata);  
        //		}
    	//});  
		//}
		
		let formData = new FormData();
		formData.append("file",document.getElementById('pic').files[0]);
		// let file = $('#pic')[0].files[0];
		// console.log("lllllll:" + file);
		// formData.set("file",file);
		//let formData = new formData($('#uploadForm'));
		_diseasek.uploadPIC(formData).then((res)=> {
			alert('图片上传成功');
		})

		_diseasek.saveDiseasek(diseasekind).then((res)=> {
			alert('信息上传成功');
			this.props.history.push('/disease_kind/index');
		})
	}
	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加病种
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">病种名称</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="请输入病种名称"
					    	name="dikind_name" id="sd"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">病种描述</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入病种描述"
					      name="dikind_des"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					 {/*<div className="form-group">
					    <label className="col-md-2 control-label">所属病种</label>
					    <CategorySelector onCategoryChange={(categroyId) => this.onCategoryChange(categroyId)}/>
					  </div>
					 */} 



					  <div className="form-group" >
					  	<label className="col-md-2 control-label">病种图片</label>
					  	<div className="col-md-5">
							<form id= "uploadForm" onChange={(e) => this.uploadPIC(e)}>
								<input type="file" name="file" id="pic" />
                        	{/*  <input type="file" name="file" id="pic"/>*/} 
                        	{/*
                        	  <div className="Section">
                                <input type="text" name="text" />
                              </div>
                        	 */}
                    	   </form>
					  	</div>
					 </div>

					<div className="form-group">
					  	<label className="col-md-2 control-label">病种详情</label>
					  	<div className="col-md-10">
					  				detail
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

export default DiseaseKindSave;