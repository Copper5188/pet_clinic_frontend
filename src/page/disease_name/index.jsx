import React        from 'react';
import {Link}       from 'react-router-dom';
import Nutil        from 'util/nn.jsx';
import DiseaseN     from 'service/disease_name-service.jsx'
 
import Pagination   from 'util/pagination/index.jsx';
import ListSearch   from './index-list-search.jsx';


import './index.scss';


const _nn         = new Nutil();
const _diseasen   = new DiseaseN();

class DiseaseName extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            list    : [],
            curPage : 1,
            total     : 1,
            diname_id : 0,
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
        _diseasen.getDiseaseName(listParam).then(res => {  //this.state.curPage
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

    delPost(diname_id){
         _diseasen.getDiseaseNameDelete(this.state.diname_id).then(res => {
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
//删除病名记录
Deletediname(e,diname_id){
    let confirmTips   = "请确认是否删除该条病名记录";
    if(window.confirm(confirmTips)){
         this.setState({
            diname_id : diname_id
        },() => {
          this.delPost(diname_id);
        }); 
    }
      
 }

    render() {
        return (
            <div id="page-wrapper">
             <h1 className='page-header'>病名管理
                <div className="page-header-right">
                    <Link to ="/disease_name/save" className='btn btn-primary'>
                        <i className='fa fa-plus'></i>
                         <span>添加病名信息</span>
                    </Link>
                </div>
            </h1>
             <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <div className="row">
                    <div className="col-md-12 ">                  
                       <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                             <th>病名ID</th>
                             <th>病名</th>
                             <th>病名描述</th>
                             <th>编辑操作</th>
                             <th>删除操作</th>
                          </tr>
                         </thead>
                         <tbody>

                         {
                            this.state.list.map((diname,index) => {
                                return(
                                    <tr key={index}>
                                         <td>{diname.diname_id}</td>
                                         <td>{diname.diname_name}</td>
                                         <td>{diname.diname_des}</td>
                                         <td> 
                                             <Link className="opear" to = { `/disease_name/detail/${diname.diname_id}`}>详情</Link>
                                             <Link className="opear" to = { `/disease_name/save/${diname.diname_id}`}>编辑</Link>                                                      
                                         </td>
                                         <td>
                                            <button className="btn btn-xs btn-warning" onClick={(e) => {this.Deletediname(e,diname.diname_id)}}>删除</button>
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

export default DiseaseName;