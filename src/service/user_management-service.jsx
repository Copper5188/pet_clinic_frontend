import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class UserM{
//拿列表、和搜索
    getUserManagement(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://192.168.1.101:5188/users/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='user_id'){
            url                        ="http://192.168.1.101:5188/users/find?user_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                else{
                    url                        ="http://192.168.1.101:5188/users/find?username=" + encodeURI(listParam.keyword);
                    data.curPage               =listParam.curPage;
                }
           // data[listParam.searchType] =listParam.keyword;
        }
        return _nn.request({
            type : 'get',
            url  :  url,//'http://192.168.1.101:5188/dikind/allList?pageSize=10&curPage=' + (curPage*1 - 1),
            //data :  data
        });

    }
//拿商品信息来编辑
    getUsermanagementinfo(user_id){
        return _nn.request({
            type : 'get',
            url  : 'http://192.168.1.101:5188/users/find?user_id=' + user_id  
            });
    }

//删除
    getUserManagementDelete(user_id){
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/users/delUser',
            data :{
                   "data": {
                        "user_id": user_id,
                            }
                    }
            });
    }

//保存
   saveUserm(usermanagement){
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/users/addUser',
            data :{
                   "data": {
                     'username'  : usermanagement.username,
                     'password'  : usermanagement.password,
                     'authority' : usermanagement.authority

                            }
                    }
            });
    }

//修改
   editUserm(usermanagement){
    // alert(JSON.stringify(usermanagement));
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/users/modifyUser',
            data :{
                   "data": {
                     'user_id'   : usermanagement.user_id,
                     'username'  : usermanagement.username,
                     'password'  : usermanagement.password,
                     'authority' : usermanagement.authority

                            }
                    }
            });
    }
    
    








}


export default UserM;
