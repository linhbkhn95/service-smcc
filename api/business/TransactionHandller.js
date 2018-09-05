/**
 * TransactionHandler
 *
 * @description :: Server-side logic for managing Fronts.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers

 giang.ngo: xu ly logic rieng cua phan front vs model Transaction 
 1. Dong bo du lieu Transaction nhan duoc tu db len redis
 2. Build bảng TransactionManage map thông tin quản lý giữa TLID và AUTOID 
 
 */
var path = require('path')
var BPSSrvc = require(path.resolve(__dirname, '../common/BPSService.js'));
var LogHelper = require(path.resolve(__dirname, '../common/LogHelper.js'));
var Iinput = require(path.resolve(__dirname, '../common/InputInterface.js'));
var Ioutput = require(path.resolve(__dirname, '../common/OutputInterface.js'));

module.exports = {
    syncTransByTLID: async function (req, res) {
        var start = process.hrtime();
        try {
            sails.log.info(LogHelper.Add('TransactionHandler.syncTransByTLID start', req.body));
            var tlid = req.body.TLID;
            var role = req.body.ROLE;
            var mbcode = req.body.MBCODE;
            var body = {
                'funckey': 'FOPKS_TX.PRC_GETUSSEARCH',
                'bindvar': {
                    'ret': { 'dir': 3003, 'type': 2004 },
                    'TLID': tlid,
                    'ROLE': role,
                    'SEARCHFILTER': '',
                }
            }
            var result = await BPSSrvc.callBPS('/ExecStatement/execProcedure', body)
            if (result.EC === 0) {
                var mbcoderole = mbcode + '_' + role;
                var arr = [];
                var ret = result.DT.ret;
                for (var data of ret.rows) {
                    var col = ret.col; var obj = {};
                    for (var index in col) {
                        obj[col[index]] = data[index];

                    }
                    obj.MBCODEROLE = mbcoderole;
                    if (obj.MAINSTATUSCD == 'P') {
                        obj.MAINSTATUSORD = 1;
                    } else if (obj.MAINSTATUSCD == 'V1') {
                        obj.MAINSTATUSORD = 2;
                    } else if (obj.MAINSTATUSCD == 'V2') {
                        obj.MAINSTATUSORD = 3;
                    } else if (obj.MAINSTATUSCD == 'C') {
                        obj.MAINSTATUSORD = 4;
                    } else if (obj.MAINSTATUSCD == 'R') {
                        obj.MAINSTATUSORD = 5;
                    } else if (obj.MAINSTATUSCD == 'D') {
                        obj.MAINSTATUSORD = 6;
                    } else if (obj.MAINSTATUSCD == 'E') {
                        obj.MAINSTATUSORD = 7;
                    } else {
                        obj.MAINSTATUSORD = 8;
                    }
                    obj.PRIKEY = mbcoderole+obj.AUTOID
                    arr.push(obj);
                }
                result.DT = arr;
                await Transactions.destroy({ MBCODEROLE: mbcoderole });
                await Transactions.create(result.DT);
                return res.json(Ioutput.jsonAPIOutput(0, 'SYNC Transactions SUCCESS', result.DT));
            } else {
                result.EM = await ErrDefs.findErr(result.EC, result.EM);
                return res.json(Ioutput.jsonAPIOutput(result.EC, result.EM, result.DT));
            }
        } catch (err) {
            sails.log.error(LogHelper.Add('error'), err);
            return res.json(Ioutput.jsonAPIOutput(-101338, 'He thong tam thoi gian doan', err));
        }
    },


};

