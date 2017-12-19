const Machine = require('../model/machine');
const async = require('async');
module.exports = {
    /**
     * @param machine mode name
     * @param callback
     */
    createMachine: function(machine,callback){
        if(!typeof machine === 'object'){
            callback('machine is not object');
            return;
        }
        for(var key in machine){
            if(!machine[key]){
                callback(key + ' value canot be null and undifined');
            }
        }
        var MachineBean =new Machine(machine);
        console.log("MachineBean;:" + JSON.stringify(MachineBean));
        MachineBean.save(callback);
    },
     /**
     * @param machine the array of machine
     * @param callback 
     */
    createBulkMachine: function(machines,callback){
        if(!Array.isArray(machines)){
            callback('machines must be a array');
        }
        Machine.insertMany(machines,null,callback).then(succees => {
            callback(null,succees);
            console.log('succees')
        },fail => {
            callback(fail,null);
            console.log('failed')
        });;
    },
    /**
     * @param machineId mode name
     * @returns Promise
     */
    deleteMachine: function(machineId){
        return Machine.remove({machineId : machineId});
    },
    /**
     * @param {object} [options=null]
     * @param {string} [options.machine] delete machine doc by this id
     * @param {string} [options.startDate] start date
     * @param {string} [options.endDate]  end date
     * @param {int} [options.pageSize] the min counts of result for this query
     * @param {int} [options.page] query's pageSize 
     * @param {string} [options.order] order by asc/desc  default asc;
     * @returns 
     */
    getMachinesById:  function(options,callback){
        //console.log('count count::'+JSON.stringify(options));
        var error;
        if(!options.Machine)
            error = 'MachineId is not defined';
        if(!options.startDate)
            error = 'Start date is not defined';
        if(!options.endDate)
            error = 'End date is not defined';
        if(error){
            callback(error,null,null);
            return;
        }
        var conditions = {
            Machine : options.Machine,
            File_cre_date : {$gt:new Date(options.startDate),$lte:new Date(options.endDate)}
        }
        var order = 1;
        if(options.order === 'desc')
            order = -1;
        var option = {
            sort : {File_cre_date : order},
            limit: options.pageSize || 20,
            skip : (options.page - 1) * options.pageSize || 0
        }
        var promise = new Promise((resolve,reject) => {
            Machine.count(conditions,(err,count) => {
                if(err){
                    reject(err);
                }else{
                    resolve(count);
                }

            });
        });
        promise.then(count => {
            Machine.find(conditions,null,option,
                (err,docs) => {callback(err,count,docs)}
            );
        },fail =>{
            callback(fail);
        }); 
    },

    /**
     * @param {object} [options=null]
     * @param {string} [options.operator] find by operator
     * @param {string} [options.startDate] start date
     * @param {string} [options.endDate]  end date
     * @param {int} [options.pageSize] the min counts of result for this query
     * @param {int} [options.page] query's pageSize 
     * @param {string} [options.order] order by asc/desc  default asc;
     * @returns 
     */
    getMachinesByUserName: function(options,callback){
        var error = '';
        if(!options.user_name)
            error = 'user_name is not defined';
        if(!options.startDate)
            error = 'Start date is not defined';
        if(!options.endDate)
            error = 'End date is not defined';
        if(error){
            callback(error);
            return;
        }
        var conditions = {
            user_name : options.user_name,
            File_cre_date : {$gt:new Date(options.startDate),$lte:new Date(options.endDate)}
        }
        var order = 1;
        if(options.order === 'desc')
            order = -1;
        var option = {
            sort : {File_cre_date : order},
            limit: options.pageSize || 20,
            skip : (options.page - 1) * options.pageSize || 0
        }
        var promise = new Promise((resolve,reject) => {
            Machine.count(conditions,(err,count) => {
                if(err){
                    reject(err);
                }else{
                    resolve(count);
                }

            });
        });
        promise.then(count => {
            Machine.find(conditions,null,option,(err,docs) => {
                callback(err,count,docs)
            });
        },fail =>{
            callback(fail);
        }); 
    },

     /**
     * @param {object} [options=null]
     * @param {string} [options.product] find by product
     * @param {string} [options.startDate] start date
     * @param {string} [options.endDate]  end date
     * @param {int} [options.pageSize] the min counts of result for this query
     * @param {int} [options.page] query's pageSize 
     * @param {string} [options.order] order by asc/desc  default asc;
     * @returns 
     */
    getMachinesByPartNo: function(options,callback){

        var error = '';
        if(!options.PartNo)
            error = 'PartNo is not defined';
        if(!options.startDate)
            error = 'Start date is not defined';
        if(!options.endDate)
            error = 'End date is not defined';
        if(error){
            callback(error);
            return;
        }
        var conditions = {
            PartNo : options.PartNo,
            File_cre_date : {$gt:new Date(options.startDate),$lte:new Date(options.endDate)}
        }
        var order = 1;
        if(options.order === 'desc')
            order = -1;
        var option = {
            sort : {File_cre_date : order},
            limit: options.pageSize || 20,
            skip : (options.page - 1) * options.pageSize || 0
        }
        var promise = new Promise((resolve,reject) => {
            Machine.count(conditions,(err,count) => {
                if(err){
                    reject(err);
                }else{
                    resolve(count);
                }

            });
        });
        promise.then(count => {
            Machine.find(conditions,null,option,(err,docs) => {
                callback(err,count,docs)
            });
        },fail =>{
            callback(fail);
        }); 
    },

    /**
     * @param {object} [options=null]
     * @param {string} [options.errorCode] find by product
     * @param {string} [options.startDate] start date
     * @param {string} [options.endDate]  end date
     * @param {int} [options.pageSize] the min counts of result for this query
     * @param {int} [options.page] query's pageSize 
     * @param {string} [options.order] order by asc/desc  default asc;
     * @returns 
     */
    getMachinesByNgName: function(options,callback){
        var error = '';
        if(!options.NG_Name)
            error = 'NgName is not defined';
        if(!options.startDate)
            error = 'Start date is not defined';
        if(!options.endDate)
            error = 'End date is not defined';
        if(error){
            callback(error);
            return;
        }
        var conditions = {
            NG_Name : options.NG_Name,
            File_cre_date : {$gt:new Date(options.startDate),$lte:new Date(options.endDate)}
        }
        var order = 1;
        if(options.order === 'desc')
            order = -1;
        var option = {
            sort : {File_cre_date : order},
            limit: options.pageSize || 20,
            skip : (options.page - 1) * options.pageSize || 0
        }
        var promise = new Promise((resolve,reject) => {
            Machine.count(conditions,(err,count) => {
                if(err){
                    reject(err);
                }else{
                    resolve(count);
                }

            });
        });
        promise.then(count => {
            Machine.find(conditions,null,option,(err,docs) => {
                callback(err,count,docs)
            });
        },fail =>{
            callback(fail);
        }); 

    },
    /**
     * @param {object} [options=null]
     * @param {string} [options.Line] find by lineNo
     * @param {string} [options.startDate] start date
     * @param {string} [options.endDate]  end date
     * @param {int} [options.pageSize] the min counts of result for this query
     * @param {int} [options.page] query's pageSize 
     * @param {string} [options.order] order by asc/desc  default asc;
     * @returns 
     */
    getMachinesByLine: function(options,callback){
        var error = '';
        if(!options.Line)
            error = 'Line is not defined';
        if(!options.startDate)
            error = 'Start date is not defined';
        if(!options.endDate)
            error = 'End date is not defined';
        if(error){
            callback(error);
            return;
        }
        var conditions = {
            Line : options.Line,
            File_cre_date : {$gt:new Date(options.startDate),$lte:new Date(options.endDate)}
        }
        var order = 1;
        if(options.order === 'desc')
            order = -1;
        var option = {
            sort : {File_cre_date : order},
            limit: options.pageSize || 20,
            skip : (options.page - 1) * options.pageSize || 0
        }
        var promise = new Promise((resolve,reject) => {
            Machine.count(conditions,(err,count) => {
                if(err){
                    reject(err);
                }else{
                    resolve(count);
                }

            });
        });
        promise.then(count => {
            Machine.find(conditions,null,option,(err,docs) => {
                callback(err,count,docs)
            });
        },fail =>{
            callback(fail);
        }); 
    },
    getMchinesSubscribeByUserName : function(userName,callback){
        
        if(!userName){
            error = 'userName is not defined';
            return;
        }
        Machine.distinct('Line',{user_name:userName},callback)
    },
    
    getMachinesByLines: function(options,callback){

        var error = '';
        if(options.Lines.length === 0)
            error = 'Lines is not defined';
        if(!options.startDate)
            error = 'Start date is not defined';
        if(!options.endDate)
            error = 'End date is not defined';
        if(error){
            callback(error);
            return;
        }
        //console.log('startDate:' + new Date(options.startDate).toUTCString());
        //console.log('endDate:' + new Date(options.endDate).toUTCString());
        //console.log('options.Lines:' + options.Lines);
        var conditions = {
            Line : {$in:options.Lines},
            File_cre_date : {$gt:new Date(options.startDate),$lte:new Date(options.endDate)}
        }
        var order = 1;
        if(options.order === 'desc'){
            order = -1;
        }
        var option = {
            sort : {File_cre_date : order},
           // limit: options.pageSize || 20,
           // skip : (options.page - 1) * options.pageSize || 0
        }        
        Machine.find(conditions,null,option,(err,docs) => {
            callback(err,docs)
        });

    }

}