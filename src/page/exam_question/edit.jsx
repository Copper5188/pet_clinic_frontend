import React                from 'react';
import Nutil                from 'util/nn.jsx';
import ExamQ             from 'service/exam_question-service.jsx';



const _nn         = new Nutil();
const _examq   = new ExamQ();
class ExamQuestionEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            test_id       : this.props.match.params.tsid,
            test_question : ' ',
            choice_A      : ' ',
            choice_B      : ' ',
            choice_C      : ' ',
            choice_D      : ' ',
            choice_correct: ' ',

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

    componentDidMount(){
        this.loadExamquestioninfo();
    }

//edit的时候往页面里加信息
    loadExamquestioninfo(){
            _examq.getExamquestioninfo(this.state.test_id).then( res => {
            //res = JSON.stringify(res);
            this.setState({test_question : res.data[0].test_question});//解析字段要一条条写
            this.setState({choice_A  : res.data[0].choice_A});
            this.setState({choice_B  : res.data[0].choice_B});
            this.setState({choice_C  : res.data[0].choice_C});
            this.setState({choice_D  : res.data[0].choice_D});
            this.setState({choice_correct  : res.data[0].choice_correct});
            //alert("load信息",this.state.test_id)
            });
             
        }
       
    
    onSubmit(){
        let examquestion ={
            test_id   : this.state.test_id,
            test_question : this.state.test_question,
            choice_A  : this.state.choice_A,
            choice_B  : this.state.choice_B,
            choice_C  : this.state.choice_C,
            choice_D  : this.state.choice_D,
            choice_correct  : this.state.choice_correct,
            //id :this.state.secondCategoryID
        };
        //alert(JSON.stringify(examquestion));
        _examq.editExamq(examquestion).then((res)=> {
            alert('修改成功');
            this.props.history.push('/exam_question/index');
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <h1 className='page-header'>修改考试题目
                </h1>
                    <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">考试题目</label>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="请输入考试题目"
                            name="test_question"
                            value={this.state.test_question}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">考题选项A</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入考题选项A"
                          name="choice_A"
                          value={this.state.choice_A}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">考题选项B</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入考题选项B"
                          name="choice_B"
                          value={this.state.choice_B}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">考题选项C</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入考题选项C"
                          name="choice_C"
                          value={this.state.choice_C}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">考题选项D</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入考题选项D"
                          name="choice_D"
                          value={this.state.choice_D}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">正确选项</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入正确选项"
                          name="choice_correct"
                          value={this.state.choice_correct}
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

export default ExamQuestionEdit;