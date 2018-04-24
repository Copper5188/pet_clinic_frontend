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
                       // "dikind_name": dikind_name,
                        //"dikind_des": dikind_des  
                            }
                    }
            });
    }
//上传图片

   uploadPIC(formData){
    //formData2.append("file",document.selectElementById('pic').val());
        // let file = $('#pic')[0].files[0];
        // console.log("iiiiiiii:" + file);
        // formData2.append("file",file);
    return new Promise((resolve,reject)=>{$.ajax({
            type      : 'post',
            url       : 'http://172.30.242.91:5188/dicase/addDicase',
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
        // return _nn.request({
        //     type : 'post',
        //     url  : 'http://172.30.242.91:5188/dicase/addDicase',
        //     data : formData,
        //     cache: false, 
        //     dataType:null,
        //     contentType: false,
        //     processData: false,
        //     success: function (returndata) {  
        //     console.log(returndata);  
        // },
        // error: function (returndata) {  
        //     console.log(returndata);  
        // }
        //     })
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
