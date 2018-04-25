import React                from 'react';
import Nutil                from 'util/nn.jsx';
import FunctionA            from 'service/function_assay-service.jsx';


const _nn         = new Nutil();
const _functiona  = new FunctionA();
class FunctionAssayEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            assay_id         : this.props.match.params.stid,
            assay_name       : ' ',
            assay_des        : ' ',

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
        this.loadFunctionassayinfo();
    }

//edit的时候往页面里加信息
    loadFunctionassayinfo(){
            _functiona.getFunctionassayinfo(this.state.assay_id).then( res => {
            //res = JSON.stringify(res);
            this.setState({assay_name  : res.data[0].assay_name});
            this.setState({assay_des   : res.data[0].assay_des});
            //alert("load信息",this.state.stay_id)
            });
             
        }
       
    
    onSubmit(){
        let functionassay ={
            assay_id       : this.state.assay_id,
            assay_name     : this.state.assay_name,
            assay_des      : this.state.assay_des,

            //id :this.state.secondCategoryID
        };
        //alert(JSON.stringify(functioninhospital));
        _functiona.editFunctiona(functionassay).then((res)=> {
            alert('修改成功');
            this.props.history.push('/function_assay/index');
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <h1 className='page-header'>修改化验信息
                </h1>
                    <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">化验名称</label>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="请输入化验名称"
                            name="assay_name"
                            value={this.state.assay_name}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                    
                      <div className="form-group">
                        <label className="col-md-2 control-label">化验描述</label>
                        <div className="col-md-5">
                          <textarea rows='8' type="text" className="form-control" placeholder="请输入化验描述"
                            name="assay_des"
                            value={this.state.assay_des}
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

export default FunctionAssayEdit;