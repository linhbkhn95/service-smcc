/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
 
     
        // MSQueue.subscriber_topic('queue_command',(message)=>{
        //    console.log(message);
        // });
     
      //   MessageQueue.subtest('ex_Authorize','queue_Authorize',function(message){
      //     console.log(message);
      //     console.log('callback1');cl
     
      //  })
      //  MessageQueue.subtest('ex_Authorize','queue1_Authorize',function(message){
      //     console.log(message);
      //     console.log('callback2');
      // //     Authorize.create(message,function Authorize(err,au){
      // //      if(err){
      // //
      // //       // res.send(401,"lỗi thêm authorize");
      // //        console.log(err);
      // //       //return  res.send(err)
      // //      }
      // // //     res.send("ok");
      // //
      // //    });
      // })
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
