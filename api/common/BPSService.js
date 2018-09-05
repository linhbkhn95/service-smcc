/**
 * BPSService
 *
 * @description :: Server-side logic for managing Fronts.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers

 giang.ngo: chua cac ham lien quan toi giao tiep vs BPSServer
 
 */

var path = require('path')
var Restfulhandler = require(path.resolve(__dirname, '../common/RestfulHandler.js'));
var LogHelper = require(path.resolve(__dirname, '../common/LogHelper.js'));
var Ioutput = require(path.resolve(__dirname, '../common/OutputInterface.js'));


module.exports = {
    callBPS: async function callBPS(action, body) {
        try {
            sails.log.info(LogHelper.Add('OrderHandler.callBPS start', body));
            var result = await Restfulhandler.post(sails.config.bpsUrl + action, body);
            if (typeof result === 'error') {
                // sails.log.error(LogHelper.Add('error'),result);
                return Ioutput.jsonAPIOutput(-101338, 'He thong tam thoi gian doan', result);
            }
            // sails.log.debug(LogHelper.Add('callBPS',sails.config.bpsUrl + action),body,result);
            return result;

        } catch (err) {
            sails.log.error(LogHelper.Add('error'), err);
            return Ioutput.jsonAPIOutput(-101338, 'He thong tam thoi gian doan', err);
        }
    },
    convert_to_Object: function convert_to_Object(ret) {
        var arr = [];
        for (var data of ret.rows) {
            var col = ret.col; var obj = {};
            for (var index in col) {
                obj[col[index]] = data[index];
            }
            arr.push(obj);
        }
        return arr;
    },
}