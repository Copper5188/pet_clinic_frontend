import React        from 'react';
import {Link}       from 'react-router-dom';
import Nutil        from 'util/nn.jsx';
import User         from 'service/user-service.jsx'
 
import Pagination   from 'util/pagination/index.jsx';


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
        
        _user.getUserList(this.state.curPage).then(res => {
            this.setState({list: res.data});
            this.setState({total: res.maxPage * 10});
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

    render() {
        return (
            <div id="page-wrapper">
             <h1 className='page-header'>用户管理</h1>
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