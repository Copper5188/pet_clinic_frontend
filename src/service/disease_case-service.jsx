import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class DiseaseC{
//拿列表、和搜索
    getDiseaseCase(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://111.231.84.129:5188/dicase/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='dicase_id'){
            url                        ="http://111.231.84.129:5188/dicase/find?dicase_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                else{
                    url                        ="http://111.231.84.129:5188/dicase/find?dicase_name=" + encodeURI(listParam.keyword);
                    data.curPage               =listParam.curPage;
                }
           // data[listParam.searchType] =listParam.keyword;
        }
        return _nn.request({
            type : 'get',
            url  :  url,//'http://111.231.84.129:5188/dikind/allList?pageSize=10&curPage=' + (curPage*1 - 1),
            //data :  data
        });

    }
//拿病例信息来编辑
    getDiseasecaseinfo(dicase_id){
        return _nn.request({
            type : 'get',
            url  : 'http://111.231.84.129:5188/dicase/find?dicase_id=' + dicase_id  
            });
    }

//删除
    getDiseaseCaseDelete(dicase_id){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/dicase/delDicase',
            data :{
                   "data": {
                        "dicase_id": dicase_id,
                       // "dikind_name": dikind_name,
                        //"dikind_des": dikind_des  
                            }
                    }
            });
    }
//上传图片

   uploadPIC(formData){
    return new Promise((resolve,reject)=>{$.ajax({
            type      : 'post',
            url       : 'http://111.231.84.129:5188/dicase/addDicase',
            data : formData,
            cache: false,
            contentType: false,
            processData: false,
          
            beforeSend: function (xhr) {
            // //发送ajax请求之前向http的head里面加入验证信息
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // 请求发起前在头部附加token
            },



            success(res){
                //alert(JSON.stringify(res));
                //请求成功
                if('000' === res.code){
                     typeof resolve === 'function' && resolve(res);
                    
                }
                else {
                     typeof reject === 'function' && reject(res.msg || res.data);
                     alert(res.msg);
                }
            },
            error(err){
                typeof reject === 'function' && reject(err.statusText);
            }
        })
    });
    }



//修改
   editDiseasec(formData){
    // alert(JSON.stringify(diseasekind));
    return new Promise((resolve,reject)=>{$.ajax({
        type      : 'post',
        url       : 'http://111.231.84.129:5188/dicase/modifyDicase',
        data : formData,
        cache: false,
        contentType: false,
        processData: false,
      
        beforeSend: function (xhr) {
        // //发送ajax请求之前向http的head里面加入验证信息
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // 请求发起前在头部附加token
        },



        success(res){
            //alert(JSON.stringify(res));
            //请求成功
            if('000' === res.code){
                 typeof resolve === 'function' && resolve(res);
                
            }
            else {
                 typeof reject === 'function' && reject(res.msg || res.data);
                 alert(res.msg);
            }
        },
        error(err){
            typeof reject === 'function' && reject(err.statusText);
        }
    })
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
            url  : 'http://111.231.84.129:5188/dikind/allList',
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
            url  : 'http://111.231.84.129:5188/diname/find?dikind_id=' + parentCategoryId,
            data :{
                   "data": {
                        "dikind_id": parentCategoryId || 0     
                            }
                    }
            });
    }

// //保存
// saveDiseasec(diseasecase){
//     return _nn.request({
//         type : 'post',
//         url  : 'http://111.231.84.129:5188/dicase/addDicase',
//         data :{
//                "data": {
//                  'dicase_name': diseasecase.dicase_name,
//                  'dicase_des' : diseasecase.dicase_des

//                         }
//                 }
//         });
// }







}


export default DiseaseC;
