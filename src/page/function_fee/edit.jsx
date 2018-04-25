import React                from 'react';
import Nutil                from 'util/nn.jsx';
import FunctionF            from 'service/function_fee-service.jsx';


const _nn         = new Nutil();
const _functionf  = new FunctionF();
class FunctionFeeEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pay_id           : this.props.match.params.stid,
            pay_amount       : ' ',
          

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
        this.loadFunctionfeeinfo();
    }

//edit的时候往页面里加信息
    loadFunctionfeeinfo(){
            _functionf.getFunctionfeeinfo(this.state.pay_id).then( res => {
            //res = JSON.stringify(res);
            this.setState({pay_name  : res.data[0].pay_name});
            this.setState({pay_amount: res.data[0].pay_amount});
            //alert("load信息",this.state.stay_id)
            });
             
        }
       
    
    onSubmit(){
        let functionfee ={
            pay_id       : this.state.pay_id,
            pay_name     : this.state.pay_name,
            pay_amount   : this.state.pay_amount,

            //id :this.state.secondCategoryID
        };
        //alert(JSON.stringify(functioninhospital));
        _functionf.editFunctionf(functionfee).then((res)=> {
            alert('修改成功');
            this.props.history.push('/function_fee/index');
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <h1 className='page-header'>修改收费信息
                </h1>
                    <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">收费名称</label>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="请输入收费名称"
                            name="pay_name"
                            value={this.state.pay_name}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                    
                      <div className="form-group">
                        <label className="col-md-2 control-label">收费金额</label>
                        <div className="col-md-5">
                          <input rows='8' type="text" className="form-control" placeholder="请输入收费金额单位（元）"
                            name="pay_amount"
                            value={this.state.pay_amount}
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

export default FunctionFeeEdit;