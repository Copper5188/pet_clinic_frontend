/*
* @Author: Rosen
* @Date:   2017-02-11 19:49:01
* @Last Modified by:   Rosen
* @Last Modified time: 2017-12-23 09:16:42
*/

// 'use strict';
import React    from 'react';
import ReactDOM from 'react-dom';
import {Link}   from 'react-router-dom';
import Mutil    from 'util/mm.jsx';
import User     from 'service/user_management-service.jsx'

const _mm 	= new Mutil();
const _user = new User();

class TopNav extends React.Component{
    constructor(props) {
        super(props);
        
    }
    //退出登录
    onLogout(){
        return _mm.request({
			type : 'get',
			url  : 'http://111.231.84.129:5188/login',
		})
    //     _user.logout().then(res =>{
    //         _mm.removeStorage('userInfo');
    //         window.location.href = 'login';
    //     },errMsg => {
    //         _mm.errorTips(errMsg);
    //     });
     }
    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <a className="navbar-brand" to="/"><b>宠物</b>医院</a>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                    
                                    <span>欢迎，admin</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>

                        <ul className="dropdown-menu dropdown-user">
                            <li className="dropdown-item">
                                {/* <a onClick={() => {this.onLogout()}}> */}
                                <a onClick={e => {this.onLogout(e)}}>
                                    <i className="fa fa-sign-out fa-fw"></i> 退出登录
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
};

export default TopNav;