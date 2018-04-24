import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class FunctionD{
//拿列表、和搜索
    getFunctionDepartment(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://192.168.1.101:5188/department/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='dpm_id'){
            url                        ="http://192.168.1.101:5188/department/find?dpm_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                else{
                    url                        ="http://192.168.1.101:5188/department/find?dpm_name=" + encodeURI(listParam.keyword);
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
    getFunctiondepartmentinfo(dpm_id){
        return _nn.request({
            type : 'get',
            url  : 'http://192.168.1.101:5188/department/find?dpm_id=' + dpm_id  
            });
    }

//删除
    getFunctionDepartmentDelete(dpm_id){
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/department/delDepartment',
            data :{
                   "data": {
                        "dpm_id": dpm_id,
                       // "dikind_name": dikind_name,
                        //"dikind_des": dikind_des  
                            }
                    }
            });
    }

//保存
   saveFunctiond(functiondepartment){
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/department/addDepartment',
            data :{
                   "data": {
                     'dpm_name': functiondepartment.dpm_name,
                     'dpm_des' : functiondepartment.dpm_des

                            }
                    }
            });
    }

//修改
   editFunctiond(functiondepartment){
    // alert(JSON.stringify(functiondepartment));
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/department/modifyDepartment',
            data :{
                   "data": {
                     'dpm_id'  : functiondepartment.dpm_id,
                     'dpm_name': functiondepartment.dpm_name,
                     'dpm_des' : functiondepartment.dpm_des

                            }
                    }
            });
    }
    
    








}


export default FunctionD;
