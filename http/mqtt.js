const q = 'mqtt://test.mosquitto.org';
const p = 'tcp://192.168.50.197:1883';
var mqtt = require('mqtt');
var client  = mqtt.connect(p);
let isConnect = false;
client.on('connect', function () {

  isConnect = true;
})
client.on('reconnect',function(){
   isConnect = true; 
});
client.on('offline',function(){
    isConnect = false; 
 });
 exports.publishMessage = function(topic,message){
    if(isConnect){
        client.publish(topic,message);
    }else{
        console.log('Mqtt Client is offline');
    }
 }
