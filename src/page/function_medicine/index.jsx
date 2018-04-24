import React        from 'react';
import {Link}       from 'react-router-dom';
import Nutil        from 'util/nn.jsx';
import FunctionM    from 'service/function_medicine-service.jsx'
 
import Pagination   from 'util/pagination/index.jsx';
import ListSearch   from './index-list-search.jsx';


import './index.scss';


const _nn         = new Nutil();
const _functionm  = new FunctionM();

class FunctionMedicine extends React.Component{
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
        _functionm.getFunctionMedicine(listParam).then(res => {  //this.state.curPage
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

    delPost(medicine_id){
         _functionm.getFunctionMedicineDelete(this.state.medicine_id).then(res => {
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
Deletemedicine(e,medicine_id){
    let confirmTips   = "请确认是否删除该条住院记录";
    if(window.confirm(confirmTips)){
         this.setState({
            medicine_id : medicine_id
        },() => {
          this.delPost(medicine_id);
        }); 
    }
      
 }

    render() {
        return (
            <div id="page-wrapper">
             <h1 className='page-header'>药品信息管理
                <div className="page-header-right">
                    <Link to ="/function_medicine/save" className='btn btn-primary'>
                        <i className='fa fa-plus'></i>
                         <span>添加药品信息</span>
                    </Link>
                </div>
            </h1>
             <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <div className="row">
                    <div className="col-md-12 ">                  
                       <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                             <th width="5%">药品ID</th>
                             <th width="8%">药品名称</th>
                             <th>药品描述</th>
                             <th width="8%">药品编辑</th>
                             <th width="8%">药品删除</th>
                          </tr>
                         </thead>
                         <tbody>

                         {
                            this.state.list.map((medicine,index) => {
                                return(
                                    <tr key={index}>
                                         <td>{medicine.medicine_id}</td>
                                         <td>{medicine.medicine_name}</td>
                                         <td>{medicine.medicine_des}</td>
                                         <td> 
                                             <Link className="opear" to = { `/function_medicine/edit/${medicine.medicine_id}`}>编辑</Link>                                                      
                                         </td>
                                         <td>
                                            <button className="btn btn-xs btn-warning" onClick={(e) => {this.Deletemedicine(e,medicine.medicine_id)}}>删除</button>
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

export default FunctionMedicine;