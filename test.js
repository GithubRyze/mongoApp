

// var mongoose = require("mongoose");
// var options = {
//     useMongoClient= true,
//     reconnectTries= Number.MAX_VALUE, // Never stop trying to reconnect
//     reconnectInterval= 500, // Reconnect every 500ms
//     poolSize= 10, // Maintain up to 10 socket connections
//     // If not connected, return errors immediately rather than waiting for reconnect
//     bufferMaxEntries= 0
//   };
// var db = mongoose.connect("mongodb=//127.0.0.1=27017/piot",options);
// var TestSchema = new mongoose.Schema({
//     name = {type=String},
//     age = {type=Number,default=0},
//     email = {type=String},
//     time = {type=Date}
// });
// var TestModel = db.model("test1",TestSchema); //'test'相当于collection
// var TestEntity = new TestModel({
//     name='helloworld',
//     age=28,
//     emial='helloworld@qq.com',
//     time = "2017-02-21 15=52"
// });
// TestEntity.save(function(err,doc){
//     if(err){
//         console.log("error =" + err);
//     } else {
//         console.log(doc);
//     }
// });



// function GetRandomNum(Min,Max)
// {   
//     var Range = Max - Min;   
//     var Rand = Math.random();   
//     return(Min + Math.round(Rand * Range));   
// } 
// var array = new Array();
// for(var x = 0; x < 100; x++){
//     var Machine = new Object();
//     Machine.lable = "123456";
//     Machine.line="321456",
//     Machine.ip="192.168.50.251",
//     Machine.machine="123",
//     Machine.nc_name="test",
//     Machine.mc_desc="hello",
//     Machine.ng_name="NG",
//     Machine.la_part="steas",
//     Machine.ng_desc="teste",
//     Machine.partNo="55",
//     Machine.pcba_number="145",
//     Machine.angle="90",
//     Machine.x_coordinate="89.21345",
//     Machine.y_coordinate="12.4585",
//     Machine.ins_user="*124569",
//     Machine.ins_name="ryze",
//     Machine.file_cre_date = new Date("2017-"+GetRandomNum(1,12)+"-"+GetRandomNum(1,28) + " 15:25"),
//    // console.log(new Date("2017-"+GetRandomNum(1,12)+"-"+GetRandomNum(1,28) + " 15:25")),
//     Machine.cre_date="2017-02-05 15:25",
//     Machine.status="NG"
//     array.push(Machine);
// } 

// require('./api/v1/machine').machineInsertMany(array,res => {
//     console.log(JSON.stringify(res));
// });




// var machine = require('./controller/machine');
// var options = {
//     machine:'123',
//     startDate: '2017-04-20 21:33',
//     endDate:'2017-05-21 24:00',
//     pageSize: 60,
//     page : 1,
//     order : 'asc'
// }
// machine.getMachinesById(options,(err,count,docs) => {
//     if(err){
//         console.log('err=='+err);
//     }

//     console.log('count=='+count);
//     console.log('docs=='+docs.length);
//     for(var x = 0;x< docs.length;x++){
//         console.log('x=='+x);
//         console.log('count=='+docs[x].file_cre_date);
//     }
// })









// var http = require('http');  
// var qs = require('querystring');  
// var data = {  
//   startDate: '2017-05-03',  
//   endDate: '2017-05-04'
// };//这是需要提交的数据  
// var content = qs.stringify(data);  

// var options = {  
//   hostname: 'http://142.2.70.140',  
//   path: '/arf/AOI_Fail_Record.asmx/AOIFailRecordDateTimeDetail?' + content,  
//   method: 'GET'  
// };  

// var req = http.request(options, function (res) {  
//   console.log('STATUS: ' + res.statusCode);  
//   console.log('HEADERS: ' + JSON.stringify(res.headers));  
//   res.setEncoding('utf8');  
//   res.on('data', function (chunk) {  
//       console.log('BODY: ' + chunk);  
//   });  
// });  

// req.on('error', function (e) {  
//   console.log('problem with request: ' + e.message);  
// });  

// req.end();  
// function  myfunc(Interval){
//     console.log("myfunc  "+Interval);
   
// }
//var myInterval=setInterval(myfunc,1000,"Interval");



var http=require('http');  
//get 请求外网  
http.get('http://142.2.70.140/arf/AOI_Fail_Record.asmx/AOIFailRecordDateTimeDetail?StartDateTime=2017-12-14 00:00&EndDateTime=2017-12-14 23:59',function(req,res){  
    var html='';  
    req.on('data',function(data){  
        html+=data;  
    });  
    req.on('end',function(){  
        console.info(html);  
        var array = eval(html);
        console.info(array.length);  
        require('./api/v1/machine').machineInsertMany(array,res => {
                console.log(JSON.stringify(res));
             });
    });  
}); 
// const q = 'mqtt://test.mosquitto.org';
// //const p = 'mqtt://192.168.50.197:1883';
// const p = 'tcp://192.168.50.197:1883';
// var mqtt = require('mqtt');
// var client  = mqtt.connect(p);

// client.on('connect', function () {
//   client.subscribe('/test')
//   client.publish('/test', 'Hello mqtt')
// })
// client.on('disconnet')
// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//   client.end()
// });
// client.on
["A4-3","A8-9","A9-8"]