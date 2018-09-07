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



async function callPostAPI(action, body) {
	try {
		sails.log.info("FrontController.callPostAPI start", body);
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
async function callGetAPI (action,access_token) {
	try {
		sails.log.info("FrontController.callGetAPI start",action,access_token);
		var result = await Restfulhandler.get(sails.config.bpsUrl + action, access_token);
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
		sails.log.info("FrontController.postRequest start",req.body);

		var rs = await callPostAPI(action, data)
		// if (rs.EC) {
		// 	rs.EM = await ErrDefs.findErr(rs.EC, rs.EM);
		// }
		
		return res.send(rs);
	},
	getRequest: async function(req,res){

		var {action,access_token} = req.body;
		sails.log.info("FrontController.getRequest start",action,access_token);

		var rs = await callGetAPI(action, access_token)
		// if (rs.EC) {
		return res.send(rs);
	},
// 	test: async function(req,res){

		
		
// 		sails.log.info("FrontController.getRequest start",'',"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdWNfYXR0dF9tb25pdG9yIiwiZXhwIjoxNTM3NTEyNzkzLCJpYXQiOjE1MzYzMDMxOTN9.HCnYq38nxvV8h6quDxJHaogf-osncwDUwdhoRzVTGf1k0cvQD4KZBlzIHbDNsRlU5nQOmERkb6aTWcTjt-5s-A");
// 		let access_token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdWNfYXR0dF9tb25pdG9yIiwiZXhwIjoxNTM3NTEyNzkzLCJpYXQiOjE1MzYzMDMxOTN9.HCnYq38nxvV8h6quDxJHaogf-osncwDUwdhoRzVTGf1k0cvQD4KZBlzIHbDNsRlU5nQOmERkb6aTWcTjt-5s-A"
// 		var rs = await callGetAPI('action', access_token)
// 		// if (rs.EC) {
// 		return res.send(rs);
// 	}
// };
   }

