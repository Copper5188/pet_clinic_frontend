import React        from 'react';
import {Link}       from 'react-router-dom';
import Nutil        from 'util/nn.jsx';
import FunctionI    from 'service/function_inhospital-service.jsx'
 
import Pagination   from 'util/pagination/index.jsx';
import ListSearch   from './index-list-search.jsx';


import './index.scss';


const _nn         = new Nutil();
const _functioni  = new FunctionI();

class FunctionInhospital extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            list    : [],
            curPage : 1,
            total     : 1,
            stay_id : 0,
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
        _functioni.getFunctionInhospital(listParam).then(res => {  //this.state.curPage
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

    delPost(stay_id){
         _functioni.getFunctionInhospitalDelete(this.state.stay_id).then(res => {
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
//删除病种记录
Deletestay(e,stay_id){
    let confirmTips   = "请确认是否删除该条住院记录";
    if(window.confirm(confirmTips)){
         this.setState({
            stay_id : stay_id
        },() => {
          this.delPost(stay_id);
        }); 
    }
      
 }

    render() {
        return (
            <div id="page-wrapper">
             <h1 className='page-header'>住院信息管理
                <div className="page-header-right">
                    <Link to ="/function_inhospital/save" className='btn btn-primary'>
                        <i className='fa fa-plus'></i>
                         <span>添加住院信息</span>
                    </Link>
                </div>
            </h1>
             <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <div className="row">
                    <div className="col-md-12 ">                  
                       <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                             <th>住院信息ID</th>
                             <th>病人姓名</th>
                             <th>入院时间</th>
                             <th>出院时间</th>
                             <th>编辑操作</th>
                             <th>删除操作</th>
                          </tr>
                         </thead>
                         <tbody>

                         {
                            this.state.list.map((stay,index) => {
                                return(
                                    <tr key={index}>
                                         <td>{stay.stay_id}</td>
                                         <td>{stay.patient_name}</td>
                                         <td>{this.state.dataFormat(stay.stay_starttime)}</td>
                                         <td>{this.state.dataFormat(stay.stay_endtime)}</td>
                                         <td> 
                                             <Link className="opear" to = { `/function_inhospital/edit/${stay.stay_id}`}>编辑</Link>                                                      
                                         </td>
                                         <td>
                                            <button className="btn btn-xs btn-warning" onClick={(e) => {this.Deletestay(e,stay.stay_id)}}>删除</button>
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

export default FunctionInhospital;