/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }
  // port:809,

  // log: {
  //   level: 'debug'
  // },
  // bpsUrl: 'http://192.168.1.92:1333', //link BPSService
  bpsUrl: 'http://203.113.152.30:12000', //link BPSService
  // bpsUrl: 'http://203.113.152.30:12000', //link BPSService

  // connections:{
  //   redispersistent: {
  //     host:'192.168.1.93',
  //   }
  // },
};
