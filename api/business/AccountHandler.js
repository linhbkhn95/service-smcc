/**
 * AccountHandler
 *
 * @description :: Server-side logic for managing Fronts.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers

 giang.ngo: xu ly logic rieng cua phan front vs model Account 
 1. Dong bo du lieu Account nhan duoc tu db len redis
 2. Build bảng AccountManage map thông tin quản lý giữa TLID và CUSTID 
 
 */
var path = require('path')
var Restfulhandler = require(path.resolve(__dirname, '../common/RestfulHandler.js'));
var LogHelper = require(path.resolve(__dirname, '../common/LogHelper.js'));
var Iinput = require(path.resolve(__dirname, '../common/InputInterface.js'));
var Ioutput = require(path.resolve(__dirname, '../common/OutputInterface.js'));
var BPSSrvc = require(path.resolve(__dirname, '../common/BPSService.js'));

async function callBPS(action, body) {
    try {
        sails.log.info(LogHelper.Add('AccountHandler.callBPS start', body));
        var result = await Restfulhandler.post(sails.config.bpsUrl + action, body);
        if (typeof result === 'error') {
            sails.log.error(LogHelper.Add('error'), result);
            return Ioutput.jsonAPIOutput(-1, 'He thong tam thoi gian doan', result);
        }
        return result;

    } catch (err) {
        sails.log.error(LogHelper.Add('error'), result);
        return Ioutput.jsonAPIOutput(-101338, 'He thong tam thoi gian doan', err);
    }
}

async function syncAccountByTLID(tlid, mbcode, role) {
    try {
        var body = {
            'funckey': 'FOPKS_CF.PRC_GET_ACCOUNTS_BY_TLID',
            'bindvar': {
                'ret': { 'dir': 3003, 'type': 2004 },
                'TLID': tlid
            }
        }
        var result = await callBPS('/ExecStatement/execProcedure', body)
        if (result.EC === 0) {
            result.DT = BPSSrvc.convert_to_Object(result.DT.ret);
            var tblkey = mbcode + '.' + role;
            var listAccount = await AccountManage.find({ TBLKEY: tblkey });
            var accountids = [];
            for (var item of listAccount) {
                accountids.push(item.CUSTID);
            }
            for(var acc of result.DT){
                accountids.push(acc.CUSTID);
            }

            await Account.destroy({ CUSTID: accountids });

            await AccountManage.destroy({ TBLKEY: tblkey });

            await Account.create(result.DT);
            var accountManages = [];
            for (var item of result.DT) {
                accountManages.push({ TBLKEY: tblkey, CUSTID: item.CUSTID });
            }
            await AccountManage.create(accountManages);

            return result.DT;
        } else {
            return [];
        }
    } catch (error) {
        sails.log.error(LogHelper.Add('error'), error);
        return [];
    }

}

module.exports = {
    syncAccountByTLID: async function (req, res) {
        try {
            sails.log.info(LogHelper.Add('AccountHandler.syncAccountByTLID start', req.body));
            var tlid = req.body.TLID;
            var mbcode = req.body.MBCODE;
            var role = req.body.ROLE;
            var result = await syncAccountByTLID(tlid, mbcode, role);
            return res.json(Ioutput.jsonAPIOutput(0, 'SYNC Account SUCCESS', result));


        } catch (err) {
            sails.log.error(LogHelper.Add('error'), err);
            return res.json(Ioutput.jsonAPIOutput(-101338, 'He thong tam thoi gian doan', err));
        }
    },
    syncAllAccount: async function (req, res) {
        try {
            sails.log.info(LogHelper.Add('AccountHandler.syncAllAccount start', req.body));
            var results = await UserInfo.find().groupBy(['MBCODE', 'ROLECODE']).average('id')
            for (var userinfo of results) {
                var user = await UserInfo.findOne({ "MBCODE": userinfo.MBCODE, "ROLECODE": userinfo.ROLECODE });
                if (user) {
                    var result = await syncAccountByTLID(user.TLID, user.MBCODE, user.ROLECODE);
                }
            }
            return res.json(Ioutput.jsonAPIOutput(0, 'SYNC Account SUCCESS, list user', results));
        } catch (err) {
            sails.log.error(LogHelper.Add('error'), err);
            return res.json(Ioutput.jsonAPIOutput(-101338, 'He thong tam thoi gian doan', err));
        }
    },
    syncCFAuthByCUSTID: async function (req, res) {
        try {
            sails.log.info(LogHelper.Add('AccountHandler.syncCFAuthByCUSTID start', req.body));
            var tlid = req.body.TLID;
            var custid = req.body.CUSTID;
            var body = {
                'funckey': 'FOPKS_CF.PRC_GET_CFAUTH_BY_CUSTID',
                'bindvar': {
                    'ret': { 'dir': 3003, 'type': 2004 },
                    'CUSTID': custid,
                    'TLID': tlid
                }
            }
            var result = await callBPS('/ExecStatement/execProcedure', body)
            if (result.EC === 0) {
                result.DT = BPSSrvc.convert_to_Object(result.DT.ret);
                await CFauth.destroy({ CUSTID: req.body.CUSTID });
                await CFauth.create(result.DT);
                return res.json(Ioutput.jsonAPIOutput(0, 'sync Account thanh cong', result.DT));
            } else {
                result.EM = await ErrDefs.findErr(result.EC, result.EM);
                return res.json(Ioutput.jsonAPIOutput(result.EC, result.EM, result.DT));
            }

        } catch (err) {
            sails.log.error(LogHelper.Add('error', err));
            return res.json(Ioutput.jsonAPIOutput(-101338, 'He thong tam thoi gian doan', err));
        }
    }

};

