import React        from 'react';
import {Link}       from 'react-router-dom';
import Nutil        from 'util/nn.jsx';
import DiseaseC     from 'service/disease_case-service.jsx'
 
import Pagination   from 'util/pagination/index.jsx';
import ListSearch   from './index-list-search.jsx';


import './index.scss';


const _nn         = new Nutil();
const _diseasec   = new DiseaseC();

class DiseaseCase extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            list    : [],
            curPage : 1,
            total     : 1,
            dicase_id : 0,
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
        _diseasec.getDiseaseCase(listParam).then(res => {  //this.state.curPage
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

    delPost(dicase_id){
         _diseasec.getDiseaseCaseDelete(this.state.dicase_id).then(res => {
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
Deletedicase(e,dicase_id){
    let confirmTips   = "请确认是否删除该条病名记录";
    if(window.confirm(confirmTips)){
         this.setState({
            dicase_id : dicase_id
        },() => {
          this.delPost(dicase_id);
        }); 
    }
 }

    render() {
        return (
            <div id="page-wrapper">
             <h1 className='page-header'>病例管理
                <div className="page-header-right">
                    <Link to ="/disease_case/save" className='btn btn-primary'>
                        <i className='fa fa-plus'></i>
                         <span>添加病例信息</span>
                    </Link>
                </div>
            </h1>
             <ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}/>
                <div className="row">
                    <div className="col-md-12 ">                  
                       <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                             <th>ID</th>
                             <th>病例</th>
                             <th>病种</th>
                             <th>病名</th>
                             <th>诊断描述</th>
                             <th>治疗描述</th>
                             <th>病例图片</th>
                             <th>病例视频</th>
                             <th>编辑</th>
                             <th>删除</th>
                          </tr>
                         </thead>
                         <tbody>

                         {
                            this.state.list.map((dicase,index) => {
                                return(
                                    <tr key={index}>
                                         <td >{dicase.dicase_id}</td>
                                         <td width="8%">{dicase.dicase_name}</td>
                                         <td width="5%">{dicase.dikind_name}</td>
                                         <td width="5%">{dicase.diname_name}</td>
                                         <td>{dicase.diagnosis_des}</td>
                                         <td>{dicase.treatment_des}</td>
                                         <td width="20%"><a href={`http://111.231.84.129:5188/images/${dicase.diagnosis_pic}  `}><img   src= {`http://111.231.84.129:5188/images/${dicase.diagnosis_pic}  ` } width="100%" /></a></td>
                                         <td width="20%"><a href={`http://111.231.84.129:5188/videos/${dicase.diagnosis_video}`}><video src= {`http://111.231.84.129:5188/videos/${dicase.diagnosis_video}` } width="100%" /></a></td>
                                         <td> 
                                             <Link className="opear" to = { `/disease_case/detail/${dicase.dicase_id}`}>详情</Link>
                                             <Link className="opear" to = { `/disease_case/edit/${dicase.dicase_id}`}>编辑</Link>                                                      
                                         </td>
                                         <td>
                                            <button className="btn btn-xs btn-warning" onClick={(e) => {this.Deletedicase(e,dicase.dicase_id)}}>删除</button>
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

export default DiseaseCase;