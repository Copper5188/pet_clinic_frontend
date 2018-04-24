import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm 	= new Mutil();
const _nn 	= new Nutil();

class User{
	login(loginInfo){
		return _mm.request({
       	type : 'post',
       	url  : 'http://111.231.84.129:5188/login',
       	//type: 'get',
       	//url: 'http://192.168.1.101:5188/users/allList?pageSize=1&curPage=0'
       	data : loginInfo
       });
	}
	//检查登录接口数据是否合法
	checkLoginInfo(loginInfo){
		let username = $.trim(logininfo.username),
			password = $.trim(logininfo.password);

		if(typeof loginInfo.username !=='string' || username.length== 0){
			return{
				status: false,
				msg:'用户名不能为空'
			}
		}

		if(typeof loginInfo.password !=='string' || username.length== 0){
			return{
				status: false,
				msg:'密码不能为空'
			}
		}
		return{
			status: true,
			msg: '验证通过'
		}
	}
	// logout(){
	// 	return _mm.request({
	// 		type : 'post',
	// 		url  : '/user/logout.do',
	// 	});
	// }

	getUserList(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://111.231.84.129:5188/users/allList?pageSize=10&curPage=' + (listParacm.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='user_id'){
            url                        ="http://111.231.84.129:5188/user/find?user_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                else{
                    url                        ="http://111.231.84.129:5188/user/find?user_name=" + encodeURI(listParam.keyword);
                    data.curPage               =listParam.curPage;
                }
           // data[listParam.searchType] =listParam.keyword;
        }
        return _nn.request({
            type : 'get',
            url  :  url,//'http://192.168.1.101:5188/user/allList?pageSize=10&curPage=' + (curPage*1 - 1),
            //data :  data
        });

    }
}

export default User;
