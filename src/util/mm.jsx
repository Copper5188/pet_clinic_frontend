class MUtil{
     request(param){
     	return new Promise((resolve,reject)=>{
     		$.ajax({
     		type 	  : param.type 	   || 'get',
     		url  	  : param.url      || '',
     		dataType  : param.dataType ||'json',
     		data 	  : param.data     || null,
            
          
            beforeSend: function (xhr) {
			// //发送ajax请求之前向http的head里面加入验证信息
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // 请求发起前在头部附加token
			},



     		success(res){
                //alert(JSON.stringify(res));
     			//请求成功
     			if('000' === res.code){
                     typeof resolve === 'function' && resolve(res.data, res.msg);

                     window.location.href='/';
     			}
     			else {
					 typeof reject === 'function' && reject(res.msg || res.data);
					 alert(res.msg);
     			}
     		},
     		error(err){
                typeof reject === 'function' && reject(err.statusText);
     		}

     	});

     	});
     	
     }

}

export default MUtil;