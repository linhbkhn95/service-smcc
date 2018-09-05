
var open = require('amqplib').connect('amqp://localhost');
 module.exports={

    'subscriber_topic': function subscriber(queue,cb){

               
                open.then(function(conn) {
                return conn.createChannel();
                }).then(function(ch) {
                    
                return ch.assertQueue(queue).then(function(ok) {
                    return ch.consume(queue, function(msg) {
                    if (msg !== null) {
                        cb(msg.content.toString());
                        ch.ack(msg);
                    }
                    });
                });
                }).catch(console.warn);
       

      },
      'subcriber_fanout':function subcriber_fanout(queue,cb){
        open.then(function(conn) {
            return conn.createChannel().then(function(ch) {
                ch.assertExchange(exchangeName, "fanout", { autoDelete: true});
                ch.assertQueue(queueName, { autoDelete: true, exclusive: true});
                //for fanout type exchange, routing key is useless
                ch.bindQueue(queueName, exchangeName, "");
                ch.consume(queueName, function(message) {
                    //callback funtion on receiving messages
                    console.log(message.content.toString());
                }, {noAck: true});
            });
        }).then(null, function(err) {
            console.error("Exception handled, reconnecting...\nDetail:\n" + err);
           // setTimeout(listen, 5000);
        });
        
      }
 }

