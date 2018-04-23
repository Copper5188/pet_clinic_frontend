import React                from 'react';
import Nutil                from 'util/nn.jsx';
import FunctionD            from 'service/function_department-service.jsx';


const _nn         = new Nutil();
const _functiond  = new FunctionD();
class FunctionDepartmentEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dpm_id   : this.props.match.params.dpmid,
            dpm_name : ' ',
            dpm_des  : ' ',

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
        this.loadFunctiondepartmentinfo();
    }

//edit的时候往页面里加信息
    loadFunctiondepartmentinfo(){
            _functiond.getFunctiondepartmentinfo(this.state.dpm_id).then( res => {
            //res = JSON.stringify(res);
            this.setState({dpm_name : res.data[0].dpm_name});//解析字段要一条条写
            this.setState({dpm_des  : res.data[0].dpm_des});
            //alert("load信息",this.state.dpm_id)
            });
             
        }
       
    
    onSubmit(){
        let functiondepartment ={
            dpm_id   : this.state.dpm_id,
            dpm_name : this.state.dpm_name,
            dpm_des  : this.state.dpm_des
            //id :this.state.secondCategoryID
        };
        //alert(JSON.stringify(functiondepartment));
        _functiond.editFunctiond(functiondepartment).then((res)=> {
            alert('修改成功');
            this.props.history.push('/function_department/index');
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <h1 className='page-header'>修改科室信息
                </h1>
                    <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">科室名称</label>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="请输入科室名称"
                            name="dpm_name"
                            value={this.state.dpm_name}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">科室描述</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入科室描述"
                          name="dpm_des"
                          value={this.state.dpm_des}
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

export default FunctionDepartmentEdit;