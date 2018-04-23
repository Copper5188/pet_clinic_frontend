import React from 'react';

class ListSearch extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			searchType     : 	'test_id',//test_id,test_question
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
                                    <option value="test_id">按考题ID查询</option>
                                    <option value="test_question">按考题查询</option>
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
