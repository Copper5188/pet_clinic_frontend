import React from 'react';

class ListSearch extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			searchType     : 	'pay_id',//diname_id,diname_name
			searchKeyword  : '',
		}
	}
//数据变化的时候
	OnValueChange(e){
		let name  = e.target.name,
			value = e.target.value.trim();
		this.setState({
			[name] : value
		});
	}
//点击搜索按钮的时候
	OnSearch(){
		this.props.onSearch(this.state.searchType, this.state.searchKeyword);
	}
	render(){
		return(
			<div className='row search-wrap'>
                        <div className="col-md-12">
                            <div className="form-inline">
                              <div className="form-group">
                                <select className="form-control" 
                                		onChange={(e) => this.OnValueChange(e)}
                                		name='searchType'>
                                    <option value="pay_id">按收费id查询</option>
                                    <option value="pay_name">按收费名称查询</option>
                                </select>
                              </div>
                              <div className="form-group"> 
                                    <input type="text" 
                                    	className="form-control" 
                                    	placeholder="关键词"
                                    	onChange={(e) => this.OnValueChange(e)}
                                    	name='searchKeyword'/>
                              </div>
                              
                              <button  className="btn btn-primary"
                              		   onClick={(e) => this.OnSearch()}>搜索
                              </button>

                            </div>
                        </div>
                  </div>
			)
	}
}
export default ListSearch;
