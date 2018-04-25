import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class FunctionF{
//拿列表、和搜索
    getFunctionFee(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://111.231.84.129:5188/pay/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='pay_id'){
            url                        ="http://111.231.84.129:5188/pay/find?pay_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                else{
                     url                        ="http://111.231.84.129:5188/pay/find?pay_name=" + encodeURI(listParam.keyword);
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
    getFunctionfeeinfo(pay_id){
        return _nn.request({
            type : 'get',
            url  : 'http://111.231.84.129:5188/pay/find?pay_id=' + pay_id  
            });
    }

//删除
    getFunctionFeeDelete(pay_id){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/pay/delPay',
            data :{
                   "data": {
                        "pay_id": pay_id,
 
                            }
                    }
            });
    }

//保存  没body
saveFunctionf(functionfee){
    return _nn.request({
        type : 'post',
        url  : 'http://111.231.84.129:5188/pay/addPay',
        data :{
               "data": {
                 'pay_name'   : functionfee.pay_name,
                 'pay_amount'    : functionfee.pay_amount,

                        }
                }
        });
}

//修改
   editFunctionf(functionfee){

        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/pay/modifyPay',
            data :{
                   "data": {
                     'pay_id'       : functionfee.pay_id,
                     'pay_name'     : functionfee.pay_name,
                     'pay_amount'   : functionfee.pay_amount,
                            }
                    }
            });
    }
    
    








}


export default FunctionF;
