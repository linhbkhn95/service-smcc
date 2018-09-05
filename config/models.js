/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  // connection: 'localDiskDb',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
  migrate: 'alter',
//   connection: 'redispersistent',
//   updateOrCreate: function(criteria, values){
//     var self = this; // reference for use by callbacks
//     // If no values were specified, use criteria
//     if (!values) values = criteria.where ? criteria.where : criteria;

//     return this.findOne(criteria).then(function (result){
//       if(result){
//         return self.update(criteria, values);
//       }else{
//         return self.create(values);
//       }
//     });
// }
};
