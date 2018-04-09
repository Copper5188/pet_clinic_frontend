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
            url                        ='http://192.168.1.101:5188/dikind/allList/%E7%94%B7%E7%A7%91%E7%97%85';
            data.curPage               =listParam.curPage;
           // data[listParam.searchType] =listParam.keyword;
        }
        return _nn.request({
            type : 'get',
            url  :  url,//'http://192.168.1.101:5188/dikind/allList?pageSize=10&curPage=' + (curPage*1 - 1),
            //data :  data
        });

    }

//删除
    getDiseaseKindDelete(dikind_id){
        return _nn.request({
            type : 'post',
            url  : 'http://192.168.1.101:5188/dikind/delDikind',
            data :{
                   "data": {
                        "dikind_id": dikind_id     
                            }
                    }
            });
    }
}

export default DiseaseK;
