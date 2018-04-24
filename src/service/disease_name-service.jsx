import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class DiseaseN{
//拿列表、和搜索
    getDiseaseName(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://111.231.84.129:5188/diname/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='diname_id'){
            url                        ="http://111.231.84.129:5188/diname/find?diname_id=7";
            data.curPage               =listParam.curPage;
            }
                else{
                    url                        ="http://111.231.84.129:5188/diname/find?diname_name=" + encodeURI(listParam.keyword);
                    data.curPage               =listParam.curPage;
                }
           // data[listParam.searchType] =listParam.keyword;
        }
        return _nn.request({
            type : 'get',
            url  :  url,//'http://111.231.84.129:5188/diname/allList?pageSize=10&curPage=' + (curPage*1 - 1),
            //data :  data
        });

    }

//删除
    getDiseaseNameDelete(diname_id){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/diname/delDiname',
            data :{
                   "data": {
                        "diname_id": diname_id     
                            }
                    }
            });
    }

//拿病名信息来编辑
    getDiseasenameinfo(diname_id){
        return _nn.request({
            type : 'get',
            url  : 'http://111.231.84.129:5188/diname/find?diname_id=' + diname_id  
            });
    }

//保存
   saveDiseasen(diseasename){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/diname/addDiname',
            data :{
                   "data": {
                     'diname_name': diseasename.diname_name,
                     'diname_des' : diseasename.diname_des

                            }
                    }
            });
    }


//修改
   editDiseasen(diseasename){
    // alert(JSON.stringify(diseasename));
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/diname/modifyDiname',
            data :{
                   "data": {
                     'diname_id'  : diseasename.diname_id,
                     'diname_name': diseasename.diname_name,
                     'diname_des' : diseasename.diname_des

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
            url  : 'http://111.231.84.129:5188/diname/allList',
            data :{
                   "data": {
                        "diname_id": parentCategoryId || 0     
                            }
                    }
            });
    }

getSecondCategoryList(parentCategoryId){
    //alert(parentCategoryId)
        return _nn.request({
            type : 'get',
            url  : 'http://111.231.84.129:5188/diname/find?diname_id=' + parentCategoryId,
            data :{
                   "data": {
                        "diname_id": parentCategoryId || 0     
                            }
                    }
            });
    }
}

export default DiseaseN;
