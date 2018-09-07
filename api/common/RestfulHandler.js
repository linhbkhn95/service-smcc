/**
 * RestfulHandler
 *
 * @description :: Server-side logic for managing Fronts.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers

 giang.ngo: xu ly call request server to server
 */

var request = require('request');
var LogHelper = require('./LogHelper.js');
var jsonoutput = require('./OutputInterface.js');

const TAG_CLASS = 'RestfulHandler'

// callGet('http://192.168.1.92','/',1333).then(function(res){
// 	console.log(res);
// });
// callPost('http://192.168.1.92:133/ExecStatement/execProcedure',{'funckey':'Sp_login','bindVar':{'p_username':'AUNT1','p_password':'123456','p_tlid':{'dir':3003,'type':2001},'p_tlfullname':{'dir':3003,'type':2001},'p_err_code':{'dir':3003,'type':2001},'p_err_param':{'dir':3003,'type':2001}}}).then(function(res){
// 	console.log(res);
// });
// callGet2('http://192.168.1.92:1333',{'test':'test'}).then(function(res){
// 	console.log(res);
// });
// function callGet(host,path,port) {
// 	sails.log.info(LogHelper.Add(TAG_CLASS,'callGet','start'));
// 	var infoLog = TAG_CLASS+'.callGet: host:'+host+path;
// 	return new Promise(function(resolve,reject){
// 		try {
// 			var protocol = http;
// 			if (host.startsWith('https://')) {
// 				protocol = https;
// 				host = host.replace('https://','');
// 			} else {
// 				host = host.replace('http://','');
// 			}
// 			if (!port) {
// 				port = 80;
// 			}
// 			var options = {
// 				hostname: host,
// 				port:port,
// 				path:path,
// 				method:'GET'
// 			};
// 			protocol.request(options,function(response) {
// 				var responseData = '';
// 				response.setEncoding('utf8');

// 				response.on('data', function(chunk){
// 					responseData += chunk;
// 				});

// 				response.once('error', function(err){
// 					sails.log.error(LogHelper.Add(infoLog,'error',err));
// 					reject(err);
// 				});

// 				response.on('end', function(){
// 					sails.log.debug(LogHelper.Add(infoLog,'responseData',responseData));
// 					resolve(jsonoutput.jsonAPIOutput(0,'',responseData));
// 				});
// 			}).end();
// 		} catch(err) {
// 			sails.log.error(infoLog,'error',err);
// 			reject(err);
// 		}
// 	}); 	
// }

// function callPost(host,path,body,port) {
// 	sails.log.info(LogHelper.Add(TAG_CLASS,'callPost','start'));
// 	var infoLog = TAG_CLASS+'.callPost: host:'+host+path+','+body;
// 	return new Promise(function(resolve,reject){
// 		try {
// 			var bodyStr = JSON.stringify(body);
// 			var headers = {
// 				'Content-Type': 'application/json',
// 				'Content-Length': bodyStr.length
// 			};
// 			var protocol = http;
// 			if (host.startsWith('https://')) {
// 				protocol = https;
// 				host = host.replace('https://','');
// 			} else {
// 				host = host.replace('http://','');
// 			}
// 			console.log(port)
// 			if (!port) {
// 				port = 80;
// 			}	
// 			var options = {
// 				hostname: host,
// 				port:port,
// 				path:path,
// 				method:'POST',
// 				headers:headers
// 			};
// 			console.log(options)
// 			protocol.request(options,function(response) {
// 				var responseData = '';
// 				response.setEncoding('utf8');

// 				response.on('data', function(chunk){
// 					responseData += chunk;
// 				});

// 				response.on('error', function(err){
// 					sails.log.error(LogHelper.Add(infoLog,'error',err));
// 					reject(err);
// 				});

// 				response.on('end', function(){
// 					sails.log.debug(LogHelper.Add(infoLog,'responseData',responseData));
// 					resolve(jsonoutput.jsonAPIOutput(0,'',responseData));
// 				});
// 			}).write(bodyStr);
// 		} catch (err) {
// 			sails.log.error(infoLog,'error',err);
// 			reject(err);
// 		}
// 	});

// }


module.exports = {
	post: function callPost(url, body) {
		sails.log.info(LogHelper.Add(TAG_CLASS, 'callPost', 'start'));
		var infoLog = TAG_CLASS + '.callPost: url:' + url + ',' + body;
		var start = process.hrtime();
		return new Promise(function (resolve, reject) {
			try {
				var headers = {
					'Content-Type': 'application/json'
				};
				request({
					url: url,
					method: 'POST',
					headers,
					// gzip: !(sails.config.DISABLE_GZIP_BPS || false),
					// timeout: sails.config.TIMEOUT_BPS || (5 * 60 * 1000),
					json: body
				}, function (err, res) {

					if (err) {
						sails.log.error(LogHelper.Add(infoLog, 'error'), err);
						reject(err)
					} else {
						let end = LogHelper.getDuration(process.hrtime(start)[1]);
						sails.log.debug(LogHelper.Add(infoLog, "Dura", end, 'responseData', res.body ? "OK" : "Null"));
						resolve(res.body);
					}

				});
			} catch (err) {
				sails.log.error(LogHelper.Add(infoLog, 'error'), err);
				reject(err);
			}
		});

	},
	//cần xác thực khi gọi
	get: function callGet(url,access_token) {
		sails.log.info(LogHelper.Add(TAG_CLASS, 'callGet', 'start'));
		var infoLog = TAG_CLASS + '.callGet: url:' + url;
		return new Promise(function (resolve, reject) {
			try {
				var headers = {
					'Authorization':'Bearer '+ access_token
				};
				request.get(url, {
					'auth': {
					  'bearer': access_token
					}
				  },function (err, res) {
				// request({
				// 	url: url,
				// 	method:'GET',
				// 	headers:{

				// 		'Content-Type': 'application/json',
				// 		'Accept':'application/json',

				// 		'Authorization':'*Bearer* '+ access_token
				// 	}
					
				// }, function (err, res) {
					if (err) {
						sails.log.error(LogHelper.Add(infoLog, 'error'), err);
						reject(err)
					} else {
						sails.log.debug(LogHelper.Add(infoLog, 'responseData', res.body));
						resolve(res.body);
					}
				});
			} catch (err) {
				sails.log.error(LogHelper.Add(infoLog, 'error'), err);
				reject(err);
			}
		});

	}
}

// curl -vv -X GET "http://203.113.152.30:12000/user/get-all-info" -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdWNfYXR0dF9tb25pdG9yIiwiZXhwIjoxNTM3NDk2MTcwLCJpYXQiOjE1MzYyODY1NzB9.c4kbogb5sa4SqjZ0xJDNNHbx0Kqed9HG51T0h0ZuIn8Oydr58x2P-lDZcCNHoc_64DvtNaJQeVOmDwwmkDOiVA' -H "Content-Type: application/json"