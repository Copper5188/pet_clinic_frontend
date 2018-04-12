import React                from 'react';
import Nutil                from 'util/nn.jsx';
import DiseaseK             from 'service/disease_kind-service.jsx';
import CategorySelector     from './category-selector.jsx';


const _nn         = new Nutil();
const _diseasek   = new DiseaseK();
class DiseaseKindEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dikind_id   : this.props.match.params.dkid,
            dikind_name : ' ',
            dikind_des  : ' ',

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
        this.loadDiseasekindinfo();
    }

//edit的时候往页面里加信息
    loadDiseasekindinfo(){
            _diseasek.getDiseasekindinfo(this.state.dikind_id).then( res => {
            //res = JSON.stringify(res);
            this.setState({dikind_name : res.data[0].dikind_name});//解析字段要一条条写
            this.setState({dikind_des  : res.data[0].dikind_des});
            //alert("load信息",this.state.dikind_id)
            });
             
        }
       
    
    onSubmit(){
        let diseasekind ={
            dikind_id   : this.state.dikind_id,
            dikind_name : this.state.dikind_name,
            dikind_des  : this.state.dikind_des
            //id :this.state.secondCategoryID
        };
        //alert(JSON.stringify(diseasekind));
        _diseasek.editDiseasek(diseasekind).then((res)=> {
            alert('修改成功');
            this.props.history.push('/disease_kind/index');
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <h1 className='page-header'>修改病种信息
                </h1>
                    <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">病种名称</label>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="请输入病种名称"
                            name="dikind_name"
                            value={this.state.dikind_name}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">病种描述</label>
                        <div className="col-md-5">
                          <input  className="form-control"  
                          placeholder="请输入病种描述"
                          name="dikind_des"
                          value={this.state.dikind_des}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                     {/*<div className="form-group">
                        <label className="col-md-2 control-label">所属病种</label>
                        <CategorySelector onCategoryChange={(categroyId) => this.onCategoryChange(categroyId)}/>
                      </div>
                     */} 
                      <div className="form-group">
                        <label className="col-md-2 control-label">病种图片</label>
                        <div className="col-md-10">
                                    xxxxx
                        </div>
                     </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">病种详情</label>
                        <div className="col-md-10">
                                    detail
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

export default DiseaseKindEdit;