var amqp = require('amqp');


// var open = require('amqplib').connect('amqp://localhost:15672/');
var op={ host: 'localhost'
, port: 5672
, login: 'guest'
, password: 'guest'
, connectionTimeout: 10000
, authMechanism: 'AMQPLAIN'
, vhost: '/'
, noDelay: true
, ssl: { enabled : false
       }
}
// var connection = amqp.createConnection(op);
// connection.on('error', function(e) {
//   console.log("Error from amqp: ", e);
// });
 module.exports={

  // ham nay dang ki nhan message theo kieu exchange la topic
  'subtest': function subtest(exchange,queue){
     
        //  var connection =  amqp.createConnection({ host: "localhost", port: 15672 });
          connection.on('ready', function(){
            console.log('ready');
            connection.exchange(exchange, {autoDelete: false}, function(ex){
              connection.queue(queue, {autoDelete: false}, function(q){
                   q.bind(exchange, queue);
                 
    
                  q.subscribe(function(message, headers, deliveryInfo, messageObject){
                  //setTimeout(function(){
                    
                      
                      console.log(message);
                      //console.log( JSON.parse(message));
                      console.log(headers);
                      console.log(deliveryInfo);
                      ex.publish(deliveryInfo.replyTo, {message: 'done'}, {headers: headers});
                  //  }, 1500);
                });
              });
            });
          });
          // var q = connection.queue(queue, function (queue) {
          //   console.log('Queue ' + queue.name + ' is open');
          // });
          // q.subscribe(function (message, headers, deliveryInfo, messageObject) {
          //   console.log('Got a message with routing key ' + deliveryInfo.routingKey);
          // });

          // connection.on('ready', function () {
          //   // Use the default 'amq.topic' exchange 
          //   connection.queue(queue, function (q) {
          //       // Catch all messages 
          //       q.bind('#');
              
          //       // Receive messages 
          //       q.subscribe(function (message) {
          //         // Print messages to stdout 
          //         console.log(message);
          //       });
          //   });
          // });

    
    
    },

    'sub': function sub(exchange,queue){
      
            var rabbit = amqp.createConnection();
            console.log('la1111111m viec');
            rabbit.on('ready', function(){
      
              rabbit.exchange(exchange, {autoDelete: false}, function(ex){
                rabbit.queue(queue, {autoDelete: false}, function(q){
                  q.bind(exchange, queue);
                  console.log('lam viec');
      
                  q.subscribe(function(message, headers, deliveryInfo, messageObject){
                    //setTimeout(function(){
                      console.log("vào đây sssss");
                      Authorize.create(message,function Authorize(err,au){
                       if(err){
      
                        // res.send(401,"lỗi thêm authorize");
                         console.log(err);
                        //return  res.send(err)
                       }
                  //     res.send("ok");
      
                     });
                      console.log(message);
                      //console.log( JSON.parse(message));
                      console.log(headers);
                      console.log(deliveryInfo);
                      ex.publish(deliveryInfo.replyTo, {message: 'done'}, {headers: headers});
                  //  }, 1500);
                  });
                });
              });
            });
      
      
          },
     //ham nay phuc vu cho viec dang ki de nhan message theo kieu broadcast message trong rabbitmq
    'subscriber': function subscriber(exchangename,queuename,cb){

          var connection = amqp.createConnection({ host: "localhost", port: 5672 });
          connection.on('ready', function () {

            connection.exchange(exchangename, options={type:'fanout'}, function(exchange) {

             
              connection.queue(queuename, function(queue){
                    console.log('Created queue '+queuename)
                    queue.bind(exchange, '');
                    queue.subscribe(function (message) {
                      console.log('subscribed to ' +queuename)
                   
                      console.log('Recieved a message:'+queue)
                      cb(message)
                    })
                  })
            });
         });


      }
 }

// add this for better debuging


// Wait for connection to become established.
