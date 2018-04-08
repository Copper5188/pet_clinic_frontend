/*
* @Author: Rosen
* @Date:   2017-02-11 19:49:01
* @Last Modified by:   Rosen
* @Last Modified time: 2017-12-23 09:16:42
*/

// 'use strict';
import React    from 'react';
import ReactDOM from 'react-dom';


class TopNav extends React.Component{
    constructor(props) {
        super(props);
        
    }
 
    render() {
        return (
            <div className="navbar navbar-default top-navbar" role="navigation">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#/"><b>宠物</b>医院</a>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" >
                            <i className="fa fa-user fa-fw"></i>
                            {
                                    
                                    <span>欢迎</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>

                        <ul className="dropdown-menu dropdown-user">
                            <li className="dropdown-item">
                                <a onClick={this.onLogout}>
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