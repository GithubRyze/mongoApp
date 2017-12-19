 var http=require('http');  
//get 请求外网  
const baseUrl = 'http://142.2.70.140/arf/AOI_Fail_Record.asmx/AOIFailRecordDateTimeDetail?';
let startDate = new Date('2017-12-14 00:00');
let startTime = startDate.getTime();
//const interval = 5*60*1000;
//let endTime = new Date(startTime.getTime()+5*60*1000);

//console.log(endTime.toDateString());
//console.log(endTime.toTimeString());
//console.log(endTime.toLocaleString());

exports.requestDate = function requestDate(interval){
    const endTime = (startTime+interval[0]);
    const queryUrl = baseUrl + 'StartDateTime=' + new Date(startTime).toLocaleString() + '&EndDateTime=' + new Date(endTime).toLocaleString()
   // console.log(interval[0]);
    http.get(queryUrl,function(req,res){  
        var html='';  
        req.on('data',function(data){  
            html += data;  
        });  
        req.on('end',function(){   
            //console.log(html);
           startTime= endTime;
            var array = eval(html);
            if(array.length !== 0){  
                require('./api/v1/machine').machineInsertMany(array);
                }
        });
        req.on('error',function(err){
            require('../common/logger').error('HttpRequest',err);
        })  
    });
}
//exports.teste = startTime;
//setInterval(requestDate,interval,'');