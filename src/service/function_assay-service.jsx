import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class FunctionA{
//拿列表、和搜索
    getFunctionAssay(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://111.231.84.129:5188/assay/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='assay_id'){
            url                        ="http://111.231.84.129:5188/assay/find?assay_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                else{
                     url                        ="http://111.231.84.129:5188/assay/find?assay_name=" + encodeURI(listParam.keyword);
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
    getFunctionassayinfo(assay_id){
        return _nn.request({
            type : 'get',
            url  : 'http://111.231.84.129:5188/assay/find?assay_id=' + assay_id  
            });
    }

//删除
    getFunctionAssayDelete(assay_id){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/assay/delAssay',
            data :{
                   "data": {
                        "assay_id": assay_id,
 
                            }
                    }
            });
    }

//保存
   saveFunctiona(functionassay){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/assay/addAssay',
            data :{
                   "data": {
                     'assay_name'   : functionassay.assay_name,
                     'assay_des'    : functionassay.assay_des,

                            }
                    }
            });
    }

//修改
   editFunctiona(functionassay){

        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/assay/modifyAssay',
            data :{
                   "data": {
                     'assay_id'          : functionassay.assay_id,
                     'assay_name'        : functionassay.assay_name,
                            }
                    }
            });
    }
    
    








}


export default FunctionA;
