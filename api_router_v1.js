const express = require('express');
const machine = require('./api/v1/machine');
const router = express.Router();

router.post('/machines/machine',machine.createMachine);
router.get('/machines/Machine',machine.getMachinesById);
router.get('/machines/Line',machine.getMachinesByLine);
router.get('/machines/User_Name',machine.getMachinesByUserName);
router.get('/machines/PartNo',machine.getMachinesByPartNo);
router.get('/machines/NG_Name',machine.getMachinesByNgName);
router.get('/machines/Subscribe',machine.getMchinesSubscribeByUserName);
router.get('/machines/Lines',machine.getMachinesByLines);
module.exports = router;