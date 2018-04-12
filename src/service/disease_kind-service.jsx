import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class DiseaseK{
//拿列表、和搜索
    getDiseaseKind(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://192.168.1.101:5188/dikind/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='dikind_id'){
            url                        ="http://192.168.1.101:5188/dikind/find?dikind_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                else{
                    url                        ="http://192.168.1.101:5188/dikind/find?dikind_name=" + encodeURI(listParam.keyword);
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
    getDiseasekindinfo(dikind_id){
        return _nn.request({
            type : 'get',
            url  : 'http://192.168.1.101:5188/dikind/find?dikind_id=' + dikind_id  
            });
    }

//删除
    getDiseaseKindDelete(dikind_id){
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/dikind/delDikind',
            data :{
                   "data": {
                        "dikind_id": dikind_id,
                        "dikind_name": dikind_name,
                        "dikind_des": dikind_des  
                            }
                    }
            });
    }

//保存
   saveDiseasek(diseasekind){
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/dikind/addDikind',
            data :{
                   "data": {
                     'dikind_name': diseasekind.dikind_name,
                     'dikind_des' : diseasekind.dikind_des

                            }
                    }
            });
    }

//修改
   editDiseasek(diseasekind){
    // alert(JSON.stringify(diseasekind));
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/dikind/modifyDikind',
            data :{
                   "data": {
                     'dikind_id'  : diseasekind.dikind_id,
                     'dikind_name': diseasekind.dikind_name,
                     'dikind_des' : diseasekind.dikind_des

                            }
                    }
            });
    }

/*
*
*     病名病种分类选择器
*
*/
getFirstCategoryList(parentCategoryId){
        return _nn.request({
            type : 'get',
            url  : 'http://192.168.1.101:5188/dikind/allList',
            data :{
                   "data": {
                        "dikind_id": parentCategoryId || 0     
                            }
                    }
            });
    }

getSecondCategoryList(parentCategoryId){
    //alert(parentCategoryId)
        return _nn.request({
            type : 'get',
            url  : 'http://192.168.1.101:5188/diname/find?dikind_id=' + parentCategoryId,
            data :{
                   "data": {
                        "dikind_id": parentCategoryId || 0     
                            }
                    }
            });
    }









}


export default DiseaseK;
