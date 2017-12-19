const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// {"Label":"217180000725",
// "Line":"A4-1",
// "IP":"172.30.15.37",
// "Machine":"ALD510",
// "MC_Name":"ALD510",
// "MC_Desc":"SW installed,Setting is un-correct.",
// "NG_Name":"",
// "la_part":"R4835-2DD",
// "PartNo":"IC0025",
// "PCBA_Number":"2017-05-03 16:03:19.010",
// "Angle":"180",
// "X_Coordinate":"229.1011",
// "Y_Coordinate":"25.0084",
// "ins_user":"*1062076",
// "user_name":"范飞翔",
// "File_cre_date":"2017-05-03 04:04:20"}
const machine = {
    Label:{type:String},
    Line:{type:String},
    IP:{type:String},
    Machine:{type:String},
    MC_Name:{type:String},
    MC_Desc:{type:String},
    NG_Name:{type:String},
    la_part:{type:String},
    PartNo:{type:String},
    PCBA_Number:{type:String},
    Angle:{type:String},
    X_Coordinate:{type:String},
    Y_Coordinate:{type:String},
    ins_user:{type:String},
    user_name:{type:String},
    File_cre_date:{type:Date},
    //cre_date:{type:String},
    //status:{type:String}
}
const MachineSchema = new Schema(machine,{
    autoIndex: false
});
module.exports = require('../mongoDb/mongodb').model('machine',MachineSchema);

