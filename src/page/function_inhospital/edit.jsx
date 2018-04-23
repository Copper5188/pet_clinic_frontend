import React                from 'react';
import Nutil                from 'util/nn.jsx';
import FunctionI            from 'service/function_inhospital-service.jsx';


const _nn         = new Nutil();
const _functioni  = new FunctionI();
class FunctionInhospitalEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stay_id         : this.props.match.params.stid,
            patient_name    : ' ',
            stay_starttime  : ' ',
            stay_endtime  : ' ',

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
        this.loadFunctioninhospitalinfo();
    }

//edit的时候往页面里加信息
    loadFunctioninhospitalinfo(){
            _functioni.getFunctioninhospitalinfo(this.state.stay_id).then( res => {
            //res = JSON.stringify(res);
            this.setState({patient_name  : res.data[0].patient_name});
            this.setState({stay_starttime: res.data[0].stay_starttime});
            this.setState({stay_endtime  : res.data[0].stay_endtime});
            //alert("load信息",this.state.stay_id)
            });
             
        }
       
    
    onSubmit(){
        let functioninhospital ={
            stay_id       : this.state.stay_id,
            patient_name  : this.state.patient_name,
            stay_starttime: this.state.stay_starttime,
            stay_endtime  : this.state.stay_endtime,
            //id :this.state.secondCategoryID
        };
        //alert(JSON.stringify(functioninhospital));
        _functioni.editFunctioni(functioninhospital).then((res)=> {
            alert('修改成功');
            this.props.history.push('/function_inhospital/index');
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <h1 className='page-header'>修改住院信息
                </h1>
                    <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">病人姓名</label>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="请输入病人姓名"
                            name="patient_name"
                            value={this.state.patient_name}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">入院时间</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入入院时间yyyy-mm-dd"
                          name="stay_starttime"
                          value={this.state.stay_starttime}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">出院时间</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入出院时间yyyy-mm-dd"
                          name="stay_endtime"
                          value={this.state.stay_endtime}
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

export default FunctionInhospitalEdit;