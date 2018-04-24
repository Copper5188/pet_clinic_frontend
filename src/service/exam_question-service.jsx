import Mutil      from 'util/mm.jsx';
import Nutil      from 'util/nn.jsx';


const _mm   = new Mutil();
const _nn   = new Nutil();

class ExamQ{
//拿列表、和搜索
    getExamQuestion(listParam){//curPage
        //alert(JSON.stringify(listParam));
        let url     = '',
            data    = {};

        if (listParam.listType === 'list'){
           // alert(listParam.curPage);
            url                        ='http://111.231.84.129:5188/test/allList?pageSize=10&curPage=' + (listParam.curPage*1 - 1);
            //data.curPage               =listParam.curPage;
        }else if (listParam.listType ==='search'){
            if (listParam.searchType ==='test_id'){
            url                        ="http://111.231.84.129:5188/test/find?test_id=" + listParam.keyword;
            data.curPage               =listParam.curPage;
            }
                else{
                    url                        ="http://111.231.84.129:5188/test/find?test_question=" + encodeURI(listParam.keyword);
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
//拿考题信息来编辑
    getExamquestioninfo(test_id){
        return _nn.request({
            type : 'get',
            url  : 'http://111.231.84.129:5188/test/find?test_id=' + test_id  
            });
    }

//删除
    getExamQuestionDelete(test_id){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/test/delTest',
            data :{
                   "data": {
                        "test_id": test_id,
                    
                            }
                    }
            });
    }

//保存
   saveExamq(examquestion){
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/test/addTest',
            data :{
                   "data": {
                     'test_question': examquestion.test_question,
                     'choice_A' : examquestion.choice_A,
                     'choice_B' : examquestion.choice_B,
                     'choice_C' : examquestion.choice_C,
                     'choice_D' : examquestion.choice_D,
                     'choice_correct' : examquestion.choice_correct

                            }
                    }
            });
    }

//修改
   editExamq(examquestion){
    // alert(JSON.stringify(examquestion));
        return _nn.request({
            type : 'post',
            url  : 'http://111.231.84.129:5188/test/modifyTest',
            data :{
                   "data": {
                     'test_id'  : examquestion.test_id,
                     'test_question': examquestion.test_question,
                     'choice_A' : examquestion.choice_A,
                     'choice_B' : examquestion.choice_B,
                     'choice_C' : examquestion.choice_C,
                     'choice_D' : examquestion.choice_D,
                     'choice_correct' : examquestion.choice_correct

                            }
                    }
            });
    }


// getFirstCategoryList(parentCategoryId){
//         return _nn.request({
//             type : 'get',
//             url  : 'http://111.231.84.129:5188/dikind/allList',
//             data :{
//                    "data": {
//                         "dikind_id": parentCategoryId || 0     
//                             }
//                     }
//             });
//     }

// getSecondCategoryList(parentCategoryId){
//     //alert(parentCategoryId)
//         return _nn.request({
//             type : 'get',
//             url  : 'http://111.231.84.129:5188/diname/find?dikind_id=' + parentCategoryId,
//             data :{
//                    "data": {
//                         "dikind_id": parentCategoryId || 0     
//                             }
//                     }
//             });
//     }









}


export default ExamQ;
