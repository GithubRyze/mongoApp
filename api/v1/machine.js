

const MachineDao = require('../../controller/machine');
const Mqtt =  require('../../http/mqtt');
exports.deleteMachine = function(req,res,next){
    //MachineDao.D();
}
exports.getMachinesById = function(req,res,next){
    if(!req.query.Machine){
        next();
        return;
    }
    const options = {
        Machine : req.query.Machine,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        pageSize: parseInt(req.query.pageSize),
        page: parseInt(req.query.page),
        order:req.query.order
    }
    MachineDao.getMachinesById(options,(error,count,docs) => {
        if(error){
            const result = {
                message: 'Failed,Check the correctness of the parameters'
            }
            console.log(error)
            res.status(200).end(JSON.stringify(result))
            return;
        }
        const results = {
            count: count,
            data:docs,
            message:'success'
        }
        res.status(200).end(JSON.stringify(results))
    });
   
}
exports.getMachinesByUserName = function(req,res,next){
    
    if(req.path !== '/machines/User_Name'){
        next();
        return;
    }
    const options = {
        user_name : req.query.User_Name,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        pageSize: parseInt(req.query.pageSize),
        page: parseInt(req.query.page),
        order:req.query.order
    }
    MachineDao.getMachinesByUserName(options,(error,count,docs) => {
        if(error){
            const result = {
                message: 'failed'
            }
            res.status(200).end(JSON.stringify(result))
            return;
        }
        const results = {
            count: count,
            data:docs,
            message:'success'
        }
        res.status(200).end(JSON.stringify(results))
    });
}
exports.getMachinesByPartNo = function(req,res,next){
    if(!req.query.PartNo){
        next();
        return;
    }
    const options = {
        PartNo : req.query.PartNo,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        pageSize: parseInt(req.query.pageSize),
        page: parseInt(req.query.page),
        order:req.query.order
    }
    MachineDao.getMachinesByPartNo(options,(error,count,docs) => {
        if(error){
            const result = {
                message: 'failed'
            }
            res.status(200).end(JSON.stringify(result))
            return;
        }
        const results = {
            count: count,
            data:docs,
            message:'success'
        }
        res.status(200).end(JSON.stringify(results))
    });
}

exports.getMachinesByNgName = function(req,res,next){
    if(!req.query.NG_Name){
        next();
        return;
    }
    const options = {
        NG_Name : req.query.NG_Name,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        pageSize: parseInt(req.query.pageSize),
        page: parseInt(req.query.page),
        order:req.query.order
    }
    MachineDao.getMachinesByNgName(options,(error,count,docs) => {
        if(error){
            const result = {
                message: 'failed'
            }
            throw new Error(error)
            res.status(200).end(JSON.stringify(result))
            return;
        }
        const results = {
            count: count,
            data:docs,
            message:'success'
        }
        res.status(200).end(JSON.stringify(results))
    });
}
exports.getMachinesByLine = function(req,res,next){
    if(!req.query.Line){
        next();
        return;
    }
    const options = {
        Line : req.query.Line,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        pageSize: parseInt(req.query.pageSize),
        page: parseInt(req.query.page),
        order:req.query.order
    }
    MachineDao.getMachinesByLine(options,(error,count,docs) => {
        if(error){
            const result = {
                message: 'failed'
            }
            res.status(200).end(JSON.stringify(result))
            return;
        }
        const results = {
            count: count,
            data:docs,
            message:'success'
        }
        res.status(200).end(JSON.stringify(results))
    });
}

exports.createMachine = function(req,res,next){
    var Machine =  {
        lable:req.body.lable,
        line:req.body.line,
        ip:req.body.ip,
        machine:req.body.machine,
        nc_name:req.body.nc_name,
        mc_desc:req.body.mc_desc,
        ng_name:req.body.ng_name,
        la_part:req.body.la_part,
        partNo:req.body.partNo,
        pcba_number:req.body.pcba_number,
        angle:req.body.angle,
        x_coordinate:req.body.x_coordinate,
        y_coordinate:req.body.y_coordinate,
        ins_user:req.body.ins_user,
        ins_name:req.body.ins_name,
        file_cre_date:req.body.file_cre_date,
        cre_date:req.body.cre_date,
        status:req.body.status
    }
    MachineDao.createMachine(Machine,function (err, product, numAffected){
        if(err){
            const result = {
                message:'create machine failed'
            }
            res.end(JSON.stringify(result));
            return;
        }
        const result = {
            message:'create machine success',
            machine:product
        }
        res.status(200).end(JSON.stringify(result));
    });
}

exports.machineInsertMany= function(machines){

    MachineDao.createBulkMachine(machines,function(err,data){
        if(err){
             console.log(err);
             return;
        }
        for(var x in data){
            Mqtt.publishMessage(x.Line,x); 
        }
    });
}

exports.getMchinesSubscribeByUserName = function(req,res,next){
   console.log('teste:'+req.path);
    if(req.path !== '/machines/Subscribe'){
        //next();
        res.end(JSON.stringify(req));
        return;
    }
    MachineDao.getMchinesSubscribeByUserName(req.query.User_Name,(err,data) => {
        if(err){
            const result = {
                message:'Get Subscribe failed'
            }
            res.end(JSON.stringify(result));
            return;
        }
        const result = {
            message:'Get Subscribe success',
            subscribe:data
        }
        res.status(200).end(JSON.stringify(result));
    })
    }

    exports.getMachinesByLines = function(req,res,next){
        console.log(req.query.Lines);
        var tst = eval(req.query.Lines);
        //console.log(Array.isArray(req.query.Lines));
        // for(var x in tst)
        // {
        //     console.log(tst[x]);
        // }
        const options = {
            Lines : tst,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
           // pageSize: parseInt(req.query.pageSize),
          //  page: parseInt(req.query.page),
            order:req.query.order
        }
        MachineDao.getMachinesByLines(options,(err,data) => {
            console.log(err);
            console.log(JSON.stringify(data));
            const result = {
                message:'Success',
                machines:data
            }
            res.status(200).end(JSON.stringify(result));
        });
}
