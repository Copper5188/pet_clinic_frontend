import React                from 'react';
import Nutil                from 'util/nn.jsx';
import DiseaseN             from 'service/disease_name-service.jsx';
import CategorySelector     from './category-selector.jsx';


const _nn         = new Nutil();
const _diseasen   = new DiseaseN();
class DiseaseNameEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            diname_id   : this.props.match.params.dnid,
            diname_name : ' ',
            diname_des  : ' ',

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
        this.loadDiseasenameinfo();
    }

//edit的时候往页面里加信息
    loadDiseasenameinfo(){
            _diseasen.getDiseasenameinfo(this.state.diname_id).then( res => {
            //res = JSON.stringify(res);
            this.setState({diname_name : res.data[0].diname_name});//解析字段要一条条写
            this.setState({diname_des  : res.data[0].diname_des});
            //alert("load信息",this.state.dikind_id)
            });
             
        }
       
    
    onSubmit(){
        let diseasename ={
            diname_id   : this.state.diname_id,
            diname_name : this.state.diname_name,
            diname_des  : this.state.diname_des
            //id :this.state.secondCategoryID
        };
        //alert(JSON.stringify(diseasekind));
        _diseasen.editDiseasen(diseasename).then((res)=> {
            alert('修改成功');
            this.props.history.push('/disease_name/index');
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <h1 className='page-header'>修改病名信息
                </h1>
                    <div className="form-horizontal">
                      <div className="form-group">
                        <label className="col-md-2 control-label">病名名称</label>
                        <div className="col-md-5">
                          <input type="text" className="form-control" placeholder="请输入病种名称"
                            name="diname_name"
                            value={this.state.diname_name}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-2 control-label">病名描述</label>
                        <div className="col-md-5">
                          <textarea rows="8" className="form-control"  
                          placeholder="请输入病种描述"
                          name="diname_des"
                          value={this.state.diname_des}
                            onChange={(e) => this.onValueChange(e)}/>
                        </div>
                      </div>
                     {/*<div className="form-group">
                        <label className="col-md-2 control-label">所属病种</label>
                        <CategorySelector onCategoryChange={(categroyId) => this.onCategoryChange(categroyId)}/>
                      </div>
                     */} 
    

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

export default DiseaseNameEdit;