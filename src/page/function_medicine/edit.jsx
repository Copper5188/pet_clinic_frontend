import React                from 'react';
import Nutil                from 'util/nn.jsx';
import FunctionM            from 'service/function_medicine-service.jsx';


const _nn         = new Nutil();
const _functionm  = new FunctionM();
class FunctionMedicineEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            medicine_id         : this.props.match.params.stid,
            medicine_name       : ' ',
            medicine_des        : ' ',

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
        this.loadFunctionmedicineinfo();
    }

//edit的时候往页面里加信息
    loadFunctionmedicineinfo(){
            _functionm.getFunctionmedicineinfo(this.state.medicine_id).then( res => {
            //res = JSON.stringify(res);
            this.setState({medicine_name  : res.data[0].medicine_name});
            this.setState({medicine_des: res.data[0].medicine_des});
            //alert("load信息",this.state.stay_id)
            });
             
        }
       
    
    onSubmit(){
        let functionmedicine ={
            medicine_id       : this.state.medicine_id,
            medicine_name     : this.state.medicine_name,
            medicine_des      : this.state.medicine_des,

            //id :this.state.secondCategoryID
        };
        //alert(JSON.stringify(functioninhospital));
        _functionm.editFunctionm(functionmedicine).then((res)=> {
            alert('修改成功');
            this.props.history.push('/function_medicine/index');
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <h1 className='page-header'>修改药品信息
                </h1>
                    <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">药品名称</label>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="请输入药品名称"
                            name="medicine_name"
                            value={this.state.medicine_name}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                    
                      <div className="form-group">
                        <label className="col-md-2 control-label">药品描述</label>
                        <div className="col-md-5">
                          <textarea rows='8' type="text" className="form-control" placeholder="请输入药品描述"
                            name="medicine_des"
                            value={this.state.medicine_des}
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

export default FunctionMedicineEdit;