var sendingRequest = 0;
var fuckyoutoo = document.body.innerHTML.match(/, ([a-z]*): fuckyou/)[1];
var limitOfTries = 1;
var checks = 0 ;
function getPagesAjax(flager, order){ 
                        sendingRequest++;
                        var pagesData ={
                            idtype: flager, 
                            order: order,
                            token: $("#token").attr("value"), 
                        } 
                        pagesData[fuckyoutoo] = fuckyou;
                        $.get("http://kingdomlikes.com/free_points/page2", pagesData, function (a) {

                            if((a instanceof Array))
                              {
                               
                                var page;
                                for(page in a ){
                                    
                                        count++;
                                         $.get("http://kingdomlikes.com/free_points/count", {token: a[page].idef, type: flager, csf: $("#token").attr("value")}, function (data) {
                                    if(data["success"]){
                                        token = data["count"];
                                     }else{
                                        token = 999999999;
                                        }
                                count--;
                                
                                setTimeout(function(){
                                    deamon(a[page].idef,token,0);
                                },0)
                            });       
                            var deamon = function (myId,token2,tries)   {
                                var postData  = {
                                    token: token
                                , id: myId
                                , check:1, csf: $("#token").attr("value")
                             }
                                postData[fuckyoutoo] = fuckyou;
                                //if(flagerList[flager]<0)return false;
                                if(tries>=limitOfTries)
                                    {
                                        --flagerList[flager];
                                        return false;
                                    }
                               
                                
                                checks++;
                                $.post("http://kingdomlikes.com/free_points/check", postData
                                , function (data) {
                                        if (data['success'] ){
                                            ++flagerList[flager];
                               console.log(data );
                               console.log(" Flag : "+flager);
                               
                               $("#points").text(data['points']);
                               
                             }else{
                                // $.get("http://kingdomlikes.com/free_points/count", {token: myId, type: flager, csf: $("#token").attr("value")}, function (data) {
                                //     if(data["success"]){
                                //         token2 = data["count"];
                                //      }else{
                                //         token2 = 999999999;
                                //         }
                                //     });  
                                
                                setTimeout(function(){
                                    deamon(myId,token2,tries+1)
                                },0)
                             }
                             checks--;
                           
                                })
                            }

                                        
                            }
                                
                            }
                        sendingRequest--;
                        });
}
flagerTry = 1
flagerList = {4:flagerTry,6:flagerTry,5:flagerTry, 7:flagerTry, 8:flagerTry,18:flagerTry,19:flagerTry};
flagerList = {1:flagerTry,
2:flagerTry,
3:flagerTry,
4:flagerTry,
5:flagerTry,
6:flagerTry,
7:flagerTry,
8:flagerTry,
9:flagerTry,
10:flagerTry,
11:flagerTry,
12:flagerTry,
13:flagerTry,
14:flagerTry,
15:flagerTry,
16:flagerTry,
17:flagerTry,
18:flagerTry,
19:flagerTry,
20:flagerTry
}

var starter = setInterval(function(){
    if(!sendingRequest && checks == 0 ){
       for( k in flagerList){
    if(flagerList[k]>0){
        getPagesAjax(k, 5)
        --flagerList[k];
    }else{
        flagerList[k]++;
    }   
    
} 
    }
    
},1000)