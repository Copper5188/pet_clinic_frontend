import React        from 'react';
import {Link}       from 'react-router-dom';
import Nutil        from 'util/nn.jsx';
import User         from 'service/user-service.jsx'

import Pagination   from 'util/pagination/index.jsx';
import ListSearch   from './index-list-search.jsx';

import './index.scss';

const _nn   = new Nutil();
const _user = new User();

class UserList extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            list    : [],
            curPage : 1,
            total   : 1,
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
        _user.getUserList(listParam).then(res => {  //this.state.curPage
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
//页数发生变化
    onCurPageChange(curPage){
        this.setState({
            curPage : curPage
        },() => {
            this.loadUserList();
        });
    }
//删除病种记录
Deleteuser(e,user_id){
    let confirmTips   = "请确认是否删除该条病种记录";
    if(window.confirm(confirmTips)){
         this.setState({
            user_id : user_id
        },() => {
          this.delPost(user_id);
        }); 
    }
      
 }
    delPost(user_id){
         _diseasek.getDiseaseKindDelete(this.state.user_id).then(res => {
            //console.log(res.data[0]);//取一个字段样例 去console里看
            alert('删除成功');
            this.loadUserList();
            //this.setState({totalPage: res.maxPage});
        } );

    }


    render() {
        return (
            <div id="page-wrapper">
             <h1 className='page-header'>用户管理</h1>
                <div className="page-header-right">
                    <Link to ="/user/save" className='btn btn-primary'>
                        <i className='fa fa-plus'></i>
                         <span>添加用户</span>
                    </Link>
                </div>
                <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <div className="row">
                    <div className="col-md-12 ">                  
                       <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                             <th>用户ID</th>
                             <th>用户名</th>
                             <th>用户密码</th>
                             <th>创建时间</th>
                             <th>用户身份</th>
                            {/*} <th>图片</th> */}
                          </tr>
                         </thead>
                         <tbody>
                         {
                            this.state.list.map((user,index) => {
                                return(
                                    <tr key={index}>
                                         <td>{user.user_id}</td>
                                         <td>{user.username}</td>
                                         <td>{user.password}</td>
                                         <td>{this.state.dataFormat(user.create_time)}</td>
                                         <td>{this.state.aut[user.authority]}</td>
                                    {/*<td><img src="http://192.168.1.101:5188/images/goods1.jpg"/></td>*/}
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

export default UserList;