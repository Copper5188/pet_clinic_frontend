
// 'use strict';
import React            from 'react';
import { Link, NavLink} from 'react-router-dom';

class SideNav extends React.Component{
    constructor(props) {
        super(props);
    }
    // // 判断菜单选中状态
    // isActiveMenu(match, location){
    //     if(!match){
    //         return false;
    //     };
    //     let regString =  '^' + match.path.replace('/','\\/') + '(\\/|$)',
    //         reg = new RegExp(regString);
    //     return reg.test(location.pathname);
    // }
    render() {
        return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav" >
                        
                        <li>
                            <NavLink exact to="/" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>
                        
                        <li>
                            <NavLink to="/user" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>用户管理</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/medicine" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>药品管理</span>
                            </NavLink>
                        </li>

{/*
                        <li>
                            <Link exact to="/" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>档案管理</span>
                            </Link>
                        </li>
*/}

                        <li>
                            <NavLink exact to="/department" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>科室管理</span>
                            </NavLink>
                        </li>


                        <li>
                            <NavLink exact to="/disease_kind" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>病种管理</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink exact to="/disease_name" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>病名管理</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink exact to="/disease_case" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>病例管理</span>
                            </NavLink>
                        </li>


                        <li>
                            <NavLink exact to="/exam_question" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>考题管理</span>
                            </NavLink>
                        </li>


{/*
                        <li>
                            <Link exact to="/" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>住院管理</span>
                            </Link>
                        </li>
*/}


                    {/*
                        <li className="active">
                            <Link to="/product">
                                <i className="fa fa-list"></i>
                                <span>商品</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/product" activeClassName="active-menu">商品管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/product.category" activeClassName="active-menu">品类管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <Link to="/order">
                                <i className="fa fa-check-square-o fa-fw"></i>
                                <span>订单</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/user">
                                <i className="fa fa-user-o fa-fw"></i>
                                <span>用户</span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">用户列表</NavLink>
                                </li>
                            </ul>
                        </li>

                    */}


                    </ul>
                </div>
            </div>
        );
    }
};

export default SideNav;