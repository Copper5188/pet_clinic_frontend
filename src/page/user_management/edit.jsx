import React                from 'react';
import Nutil                from 'util/nn.jsx';
import UserM             from 'service/user_management-service.jsx';


const _nn         = new Nutil();
const _userm   = new UserM();
class UserManagementEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user_id     : this.props.match.params.usid,
            username    : ' ',
            password    : ' ',
            create_time : ' ',
            authority   : ' ',

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
        this.loadUsermanagementinfo();
    }

//edit的时候往页面里加信息
    loadUsermanagementinfo(){
            _userm.getUsermanagementinfo(this.state.user_id).then( res => {
            //res = JSON.stringify(res);
            this.setState({username : res.data[0].username});//解析字段要一条条写
            this.setState({password  : res.data[0].password});
            this.setState({create_time  : res.data[0].create_time});
            this.setState({authority  : res.data[0].authority});
            //alert("load信息",this.state.user_id)
            });
             
        }
       
    
    onSubmit(){
        let usermanagement ={
            user_id     : this.state.user_id,
            username    : this.state.username,
            password    : this.state.password,
            create_time : this.state.create_time,
            authority   : this.state.authority
            //id :this.state.secondCategoryID
        };
        //alert(JSON.stringify(usermanagement));
        _userm.editUserm(usermanagement).then((res)=> {
            alert('修改成功');
            this.props.history.push('/user_management/index');
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <h1 className='page-header'>修改用户信息
                </h1>
                    <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">用户名</label>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="请输入用户名"
                            name="username"
                            value={this.state.username}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">用户密码</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入用户密码"
                          name="password"
                          value={this.state.password}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">用户身份</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入用户身份"
                          name="authority"
                          value={this.state.authority}
                            onChange={(e) => this.onValueChange(e)}/>
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

export default UserManagementEdit;