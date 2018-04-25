import React        from 'react';
import {Link}       from 'react-router-dom';
import Nutil        from 'util/nn.jsx';
import ExamQ    from 'service/exam_question-service.jsx'
 
import Pagination   from 'util/pagination/index.jsx';
import ListSearch   from './index-list-search.jsx';


import './index.scss';


const _nn         = new Nutil();
const _examq   = new ExamQ();

class ExamQuestion extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            list    : [],
            curPage : 1,
            total     : 1,
            test_id : 0,
            listType  :'list',
            aut : {
                    0: '管理员',
                    1: '普通用户'
                  },
            dataFormat: (date) => date.substring(0,10) 
        };
    }

    componentDidMount(){
        this.loadUserList();
    }
    
    loadUserList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.curPage  = this.state.curPage;
//如果是搜索的话传入搜索和关键字
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword    = this.state.searchKeyword;
        }
        //alert(JSON.stringify(listParam));
        _examq.getExamQuestion(listParam).then(res => {  //this.state.curPage
            console.log(res.data[0]);//取一个字段样例 去console里看
            this.setState({list: res.data});
           // alert(res.maxPage);
            this.setState({total: res.maxPage * 10});
            //this.setState({totalPage: res.maxPage});
        } );
    }

    
    onSearch(searchType,searchKeyword){
        let listType = searchKeyword === ''?'list' : 'search';
        this.setState({
            listType      : listType,
            curPage       : 1,
            searchType    : searchType,
            searchKeyword : searchKeyword 
           },()=>{
                this.loadUserList();
        });
        //console.log(searchType,searchKeyword);浏览器里拿搜索框的值
    }

    delPost(test_id){
         _examq.getExamQuestionDelete(this.state.test_id).then(res => {
            //console.log(res.data[0]);//取一个字段样例 去console里看
            alert('删除成功');
            this.loadUserList();
            //this.setState({totalPage: res.maxPage});
        } );

    }

//页数发生变化
    onCurPageChange(curPage){
        this.setState({
            curPage : curPage
        },() => {
            this.loadUserList();
        });
    }
//删除考题记录
    Deletetest(e,test_id){
        let confirmTips   = "请确认是否删除该条考试题目";
        if(window.confirm(confirmTips)){
            this.setState({
                test_id : test_id
            },() => {
                this.delPost(test_id);
            });  
        }
    }

    render() {
        return (
            <div id="page-wrapper">
             <h1 className='page-header'>考题管理
                <div className="page-header-right">
                    <Link to ="/exam_question/save" className='btn btn-primary'>
                        <i className='fa fa-plus'></i>
                         <span>添加考题</span>
                    </Link>
                </div>
            </h1>
             <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <div className="row">
                    <div className="col-md-12 ">                  
                       <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                             <th width="5%">考题ID</th>
                             <th>考试题目</th>
                             <th>考题选项A</th>
                             <th>考题选项B</th>
                             <th>考题选项C</th>
                             <th>考题选项D</th>
                             <th width="5%">答案</th>
                             <th width="5%">编辑</th>
                             <th width="5%">删除</th>
                          </tr>
                         </thead>
                         <tbody>

                         {
                            this.state.list.map((test,index) => {
                                return(
                                    <tr key={index}>
                                         <td>{test.test_id}</td>
                                         <td>{test.test_question}</td>
                                         <td>{test.choice_A}</td>
                                         <td>{test.choice_B}</td>
                                         <td>{test.choice_C}</td>
                                         <td>{test.choice_D}</td>
                                         <td>{test.choice_correct}</td>
                                         <td> 
                                             <Link className="opear" to = { `/exam_question/edit/${test.test_id}`}>编辑</Link>                                                      
                                         </td>
                                         <td>
                                            <button className="btn btn-xs btn-warning" onClick={(e) => {this.Deletetest(e,test.test_id)}}>删除</button>
                                         </td>
                                    </tr>
                                 );

                            })
                         }
                      
                          </tbody>
                      </table>
                    </div>
                </div>

                <Pagination current={ this.state.curPage}
                            total={ this.state.total} 
                            onChange={ (curPage)=> this.onCurPageChange(curPage)}></Pagination>
            </div>
        );
    }
}

export default ExamQuestion;