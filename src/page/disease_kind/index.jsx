import React        from 'react';
import {Link}       from 'react-router-dom';
import Nutil        from 'util/nn.jsx';
import DiseaseK     from 'service/disease_kind-service.jsx'
 
import Pagination   from 'util/pagination/index.jsx';
import ListSearch   from './index-list-search.jsx';


import './index.scss';


const _nn         = new Nutil();
const _diseasek   = new DiseaseK();

class DiseaseKind extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            list    : [],
            curPage : 1,
            total     : 1,
            dikind_id : 0,
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
            listParam.keyword    = this.state.searchkeword;
        }
        //alert(JSON.stringify(listParam));
        _diseasek.getDiseaseKind(listParam).then(res => {  //this.state.curPage
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

    delPost(dikind_id){
         _diseasek.getDiseaseKindDelete(this.state.dikind_id).then(res => {
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
Deletedikind(e,dikind_id){
    let confirmTips   = "请确认是否删除该条病种记录";
    if(window.confirm(confirmTips)){
         this.setState({
            dikind_id : dikind_id
        },() => {
          this.delPost(dikind_id);
        }); 
    }
      
 }

    render() {
        return (
            <div id="page-wrapper">
             <h1 className='page-header'>病种管理
                <div className="page-header-right">
                    <Link to ="/disease_kind/save" className='btn btn-primary'>
                        <i className='fa fa-plus'></i>
                         <span>添加病种信息</span>
                    </Link>
                </div>
            </h1>
             <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <div className="row">
                    <div className="col-md-12 ">                  
                       <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                             <th>病种ID</th>
                             <th>病种名</th>
                             <th>病种描述</th>
                             <th>编辑操作</th>
                             <th>删除操作</th>
                          </tr>
                         </thead>
                         <tbody>

                         {
                            this.state.list.map((dikind,index) => {
                                return(
                                    <tr key={index}>
                                         <td>{dikind.dikind_id}</td>
                                         <td>{dikind.dikind_name}</td>
                                         <td>{dikind.dikind_des}</td>
                                         <td> 
                                             <Link className="opear" to = { `/disease_kind/detail/${dikind.dikind_id}`}>详情</Link>
                                             <Link className="opear" to = { `/disease_kind/save/${dikind.dikind_id}`}>编辑</Link>                                                      
                                         </td>
                                         <td>
                                            <button className="btn btn-xs btn-warning" onClick={(e) => {this.Deletedikind(e,dikind.dikind_id)}}>删除</button>
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

export default DiseaseKind;