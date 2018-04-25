import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class FunctionM{
//拿列表、和搜索
    getFunctionMedicine(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://111.231.84.129:5188/medicine/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='medicine_id'){
            url                        ="http://111.231.84.129:5188/medicine/find?medicine_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                else{
                     url                        ="http://111.231.84.129:5188/medicine/find?medicine_name=" + encodeURI(listParam.keyword);
                     data.curPage               =listParam.curPage;
                 }
            data[listParam.searchType] =listParam.keyword;
        }
        return _nn.request({
            type : 'get',
            url  :  url,//'http://111.231.84.129:5188/dikind/allList?pageSize=10&curPage=' + (curPage*1 - 1),
            //data :  data
        });

    }
//拿住院信息来编辑
    getFunctionmedicineinfo(medicine_id){
        return _nn.request({
            type : 'get',
            url  : 'http://111.231.84.129:5188/medicine/find?medicine_id=' + medicine_id  
            });
    }

//删除
    getFunctionMedicineDelete(medicine_id){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/medicine/delMedicine',
            data :{
                   "data": {
                        "medicine_id": medicine_id,
 
                            }
                    }
            });
    }

//保存
   saveFunctionm(functionmedicine){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/medicine/addMedicine',
            data :{
                   "data": {
                     'medicine_name'   : functionmedicine.medicine_name,
                     'medicine_des'    : functionmedicine.medicine_des,

                            }
                    }
            });
    }

//修改
   editFunctionm(functionmedicine){

        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/medicine/modifyMedicine',
            data :{
                   "data": {
                     'medicine_id'       : functionmedicine.medicine_id,
                     'medicine_name'     : functionmedicine.medicine_name,
                     'medicine_des'      : functionmedicine.medicine_des,
                            }
                    }
            });
    }
    
    








}


export default FunctionM;
