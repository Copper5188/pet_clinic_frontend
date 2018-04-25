import React 	 from 'react';
import PageTitle from 'component/page-title/index.jsx'
import './index.css';

class Home extends React.Component{
	render(){
		return(
				<div id="page-wrapper">
				  <h1 className='page-header'>欢迎来到宠物医院后台管理系统</h1>
				  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1524664078&di=d9066cca04fdb1be7d609abb66a9c8db&src=http://imgsrc.baidu.com/forum/pic/item/7af40ad162d9f2d3dd478d76a9ec8a136227ccd1.jpg" width="100%" height="100%"/>


				    <PageTitle title="首页">
				     	
				    </PageTitle>
				    	
				</div>
				
			);
	}
}

export default Home;

