
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
                            <NavLink to="/user_management/index" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>用户管理</span>
                            </NavLink>
                        </li>
                        <li className="active">
                            <NavLink to="#" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>结构与功能管理</span>
                                <span className="fa arrow"></span>
                            </NavLink>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/function_department/index" activeClassName="active-menu">科室管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/function_inhospital/index" activeClassName="active-menu">住院信息管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/function_medicine/index" activeClassName="active-menu">药品管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/function_fee/index" activeClassName="active-menu">收费管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/function_assay/index" activeClassName="active-menu">化验项目管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        {/* <li>
                            <NavLink to="/medicine" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>药品管理</span>
                            </NavLink>
                        </li> */}

{/*
                        <li>
                            <Link exact to="/" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>档案管理</span>
                            </Link>
                        </li>
*/}
                        {/* <li>
                            <NavLink exact to="/department" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>科室管理</span>
                            </NavLink>
                        </li> */}


                        <li>
                            <NavLink to="/disease_kind/index" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>病种管理</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink exact to="/disease_name/index" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>病名管理</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink exact to="/disease_case/index" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>病例管理</span>
                            </NavLink>
                        </li>


                        <li>
                            <NavLink exact to="/exam_question/index" activeClassName="active-menu">
                                <i className="fa fa-bar-chart-o"></i>
                                <span>考题管理</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};

export default SideNav;