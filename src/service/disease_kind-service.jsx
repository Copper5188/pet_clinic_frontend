import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class DiseaseK{
//拿列表
    getDiseaseKind(curPage){//listParam
        //let url = '',
        //if (listParam.listType === 'list'){
        //    url             ='http://192.168.1.101:5188/dikind/allList?pageSize=10&curPage=' + (curPage*1 - 1);
        //    data.curPage    =listParam.curPage;
        //}else if (listParam.listType ==='search'){
        //    url             ='http://192.168.1.101:5188/dikind/allList?pageSize=10&curPage=' + (curPage*1 - 1);
        //    data.curPage    =listParam.curPage;
        //}
        return _nn.request({
            type : 'get',
            url  : 'http://192.168.1.101:5188/dikind/allList?pageSize=10&curPage=' + (curPage*1 - 1),
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
