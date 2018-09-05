/**
 * UserInfo.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    USERKEY: { type: 'string', primaryKey: true },
    USERID: { type: 'string' },
    TLFULLNAME: { type: 'string' },
    MBCODE: { type: 'string' },
    ACTIVE: { type: 'string' },
    TLTYPE: { type: 'string' },
    STATUS: { type: 'string' },
    DEPARTMENT: { type: 'string' },
    TLTITLE: { type: 'string' },
    IDCODE: { type: 'string' },
    MOBILE: { type: 'string' },
    EMAIL: { type: 'string' },
    DESCRIPTION: { type: 'string' },
    DBCODE: { type: 'string' },
    ROLECODE: { type: 'string' },
  },

};

