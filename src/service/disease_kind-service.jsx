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
            url                        ="http://192.168.1.101:5188/dikind/find?dikind_id=7";
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
