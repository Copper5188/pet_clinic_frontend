import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class FunctionD{
//拿列表、和搜索
    getFunctionInhospital(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://111.231.84.129:5188/stay/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='stay_id'){
            url                        ="http://111.231.84.129:5188/stay/find?stay_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                // else{
                //     url                        ="http://111.231.84.129:5188/department/find?dpm_name=" + encodeURI(listParam.keyword);
                //     data.curPage               =listParam.curPage;
                // }
           // data[listParam.searchType] =listParam.keyword;
        }
        return _nn.request({
            type : 'get',
            url  :  url,//'http://192.168.1.101:5188/dikind/allList?pageSize=10&curPage=' + (curPage*1 - 1),
            //data :  data
        });

    }
//拿商品信息来编辑
    getFunctioninhospitalinfo(stay_id){
        return _nn.request({
            type : 'get',
            url  : 'http://111.231.84.129:5188/stay/find?stay_id=' + stay_id  
            });
    }

//删除
    getFunctionInhospitalDelete(stay_id){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/stay/delStay',
            data :{
                   "data": {
                        "stay_id": stay_id,
 
                            }
                    }
            });
    }

//保存
   saveFunctioni(functioninhospital){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/stay/addStay',
            data :{
                   "data": {
                     'patient_name'   : functioninhospital.patient_name,
                     'stay_starttime' : functioninhospital.stay_starttime,
                     'stay_endtime'   : functioninhospital.stay_endtime,

                            }
                    }
            });
    }

//修改
   editFunctioni(functioninhospital){

        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/stay/modifyStay',
            data :{
                   "data": {
                     'stay_id'       : functioninhospital.stay_id,
                     'patient_name'  : functioninhospital.patient_name,
                     'stay_starttime': functioninhospital.stay_starttime,
                     'stay_endtime'  : functioninhospital.stay_endtime,
                            }
                    }
            });
    }
    
    








}


export default FunctionD;
