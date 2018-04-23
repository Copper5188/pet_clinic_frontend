import React    			from 'react';
import Nutil        		from 'util/nn.jsx';
import ExamQ     		from 'service/exam_question-service.jsx';



const _nn         = new Nutil();
const _examq   = new ExamQ();
class ExamQuestionSave extends React.Component{
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
		let examquestion ={
			test_question : this.state.test_question,
			choice_A 	    : this.state.choice_A,
			choice_B	    : this.state.choice_B,
			choice_C 	    : this.state.choice_C,
			choice_D 	    : this.state.choice_D,
			choice_correct: this.state.choice_correct
			//id :this.state.secondCategoryID
		};
		_examq.saveExamq(examquestion).then((res)=> {
			alert('上传成功');
			this.props.history.push('/exam_question/index');
		})
	}
	render(){
		return(
			<div id="page-wrapper">
             	<h1 className='page-header'>添加考题
             	</h1>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">考试题目</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="请输入考题"
					    	name="test_question"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">考题选项A</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入选项A"
					      name="choice_A"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
						<div className="form-group">
					    <label className="col-md-2 control-label">考题选项B</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入选项B"
					      name="choice_B"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
						<div className="form-group">
					    <label className="col-md-2 control-label">考题选项C</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入选项C"
					      name="choice_C"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
						<div className="form-group">
					    <label className="col-md-2 control-label">考题选项D</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入选项D"
					      name="choice_D"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
						<div className="form-group">
					    <label className="col-md-2 control-label">正确选项</label>
					    <div className="col-md-5">
					      <input  className="form-control"  
					      placeholder="请输入正确选项"
					      name="choice_correct"
					    	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					 {/*<div className="form-group">
					    <label className="col-md-2 control-label">所属病种</label>
					    <CategorySelector onCategoryChange={(categroyId) => this.onCategoryChange(categroyId)}/>
					  </div>
					 */} 
					  {/* <div className="form-group">
					  	<label className="col-md-2 control-label">病种图片</label>
					  	<div className="col-md-10">
					  				xxxxx
					  	</div>
					 </div>

					<div className="form-group">
					  	<label className="col-md-2 control-label">病种详情</label>
					  	<div className="col-md-10">
					  				detail
					  	</div>
					 </div> */}

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

export default ExamQuestionSave;