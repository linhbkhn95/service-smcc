/**
 * OrderHandler
 *
 * @description :: Server-side logic for managing Fronts.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers

 giang.ngo: xu ly logic rieng cua phan front vs model Order 
 1. Dong bo du lieu Order nhan duoc tu db len redis
 
 */
var path = require('path')
var Restfulhandler = require(path.resolve(__dirname, '../common/RestfulHandler.js'));
var LogHelper = require(path.resolve(__dirname, '../common/LogHelper.js'));
var Iinput = require(path.resolve(__dirname, '../common/InputInterface.js'));
var Ioutput = require(path.resolve(__dirname, '../common/OutputInterface.js'));
var BPSSrvc = require(path.resolve(__dirname, '../common/BPSService.js'));


module.exports = {

    /**
     * giang.ngo: get du lieu so lenh tu db len Redis
     * parameter: TLID,DBCODE
     */
    syncOrderByTLID: async function (req, res) {
        try {
            sails.log.info(LogHelper.Add('OrderHandler.synOrderByTLID start', req.body));
            var tlid = req.body.TLID;
            var dbCode = req.body.DBCODE;
            var body = {
                'funckey': 'FOPKS_SR.PRC_GET_ORDERDBOOK',
                'bindvar': {
                    'ret': { 'dir': 3003, 'type': 2004 },
                    'TLID': tlid,
                    'TRADINGID': '',
                    'SYMBOL': ''
                }
            }
            var result = await BPSSrvc.callBPS('/ExecStatement/execProcedure', body)
            if (result.EC === 0) {
                result.DT = BPSSrvc.convert_to_Object(result.DT.ret);
                // await Orders.destroy({DBCODE:dbCode});
                var orderArr = [];
                for (var order of result.DT) {
                    order.DBCODE = dbCode;
                    orderArr.push(order);
                }
                await Orders.create(orderArr);
                return res.json(Ioutput.jsonAPIOutput(0, 'sync Order thanh cong', result.DT));
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

