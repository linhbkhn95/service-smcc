/**
 * FrontController
 *
 * @description :: Server-side logic for managing Fronts.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers

 giang.ngo: xu ly cac action them sua xoa vs model object cua web, mobile,...
 1. Nhan model tu web,mobile
 2. Gan action tuong ung vao model
 3. Insert vao RBMQ
 4. Return response cho web,mobile
 */
var path = require('path')
var Restfulhandler = require(path.resolve(__dirname, '../common/RestfulHandler.js'));
var Iinput = require(path.resolve(__dirname, '../common/InputInterface.js'));
var Ioutput = require(path.resolve(__dirname, '../common/OutputInterface.js'));
var LogHelper = require(path.resolve(__dirname, '../common/LogHelper.js'));

var request = require('request');
var fs = require('fs');



async function callBPS(action, body) {
	try {
		sails.log.info("FrontController.callBPS start", body);
		var result = await Restfulhandler.post(sails.config.bpsUrl + action, body);
		if (typeof result === 'error') {
			sails.log.error(LogHelper.Add('error'), result);
			return Ioutput.jsonAPIOutput(-1, 'He thong tam thoi gian doan', result);
		}
		return result;

	} catch (err) {
		sails.log.error(LogHelper.Add('error'), err);
		return Ioutput.jsonAPIOutput(-101338, 'He thong tam thoi gian doan', err);
	}
}
 


module.exports = {
	postRequest: async function (req, res) {
		var body = req.body;
		var {action,data} = req.body;
		var rs = await callBPS(action, data)
		// if (rs.EC) {
		// 	rs.EM = await ErrDefs.findErr(rs.EC, rs.EM);
		// }
		
		console.log('postRequest',res)
		return res.send(req.body);
	},
	get:function(req,res){
		return res.send({data:'a'});
	}
};

