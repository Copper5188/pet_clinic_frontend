import React 	 from 'react';
import PageTitle from 'component/page-title/index.jsx'
import './index.css';

class Home extends React.Component{
	render(){
		return(
				<div id="page-wrapper">
				  <h1 className='page-header'>首页</h1>
				  <img src="hompage.jpg" width="425" height="510"/>
				    <PageTitle title="首页">
				     	
				    </PageTitle>
				    	<div className="row">
				    		<div className="col-md-12">
				    		body
				    		</div>
				    	</div>
				</div>
				
			);
	}
}

export default Home;