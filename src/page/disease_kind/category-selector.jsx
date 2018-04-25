import React  			from 'react';
import Nutil            from 'util/nn.jsx';
import DiseaseK     	from 'service/disease_kind-service.jsx';

import './category-selector.scss';
const _nn         = new Nutil();
const _diseasek   = new DiseaseK();

class CategorySelector extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			firstCategoryList 	: [],
			firstCategoryId   	: 0,
			secondCategoryList	: [],
			secondCategoryId    : 0,
		}
	}
	componentDidMount(){
		this.loadFirstCategory();
	}
	//加载一级分类
	loadFirstCategory(){
		_diseasek.getFirstCategoryList().then(res => {
			this.setState({
				firstCategoryList : res.data
			});
		});

	}

	//加载二级
	loadSecondCategory(){
		_diseasek.getSecondCategoryList(this.state.firstCategoryId).then(res => {
			this.setState({
				secondCategoryList : res.data
			});
		});
	}

	//选择一级品类
	onFirstCategoryChange(e){
		let newValue =e.target.value || 0;
		this.setState({
			firstCategoryId    :newValue,
			secondCategoryId   :0,
			secondCategoryList :[]

		},() => {
			//更新二级
			this.loadSecondCategory();
			//alert('second',firstCategoryId);
		});
	}

	//选择二级品类
	onSecondCategoryChange(e){
		let newValue =e.target.value || 0;
		this.setState({
			secondCategoryId    : newValue,
			
		},() => {
			//alert(this.state.secondCategoryId);	//很重要传他传他
		});
	}

	


//传给父组建选中的结果
	onPropsCategoryChange(){

	}

	

	render(){
		return(
			<div className="col-md-10">
				<select className="form-control cate-select"
				onChange = {(e) => this.onFirstCategoryChange(e)}>
					<option value="">请选择所属病种</option>
					{
						this.state.firstCategoryList.map(
							(category, index) => <option value={category.dikind_id} key ={index}>{category.dikind_name}</option>
							)
					}
				</select>
				{this.state.secondCategoryList.length ?
				(<select name="" id="" className="form-control cate-select"
					onChange = {(e) => this.onSecondCategoryChange(e)}>
					<option value="">请选择所属病名</option>
					{
						this.state.secondCategoryList.map(
							(category, index) => <option value={category.diname_id} key ={index}>{category.diname_name}</option>
							)
					}
				</select> ) : null
			}
			</div>
			)
	}
}



export default CategorySelector