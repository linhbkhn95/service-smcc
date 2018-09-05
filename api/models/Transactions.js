/**
 * Transactions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    PRIKEY: { type: 'string',primaryKey:true },
    CFFULLNAME: { type: 'string' },
    IDAFACCTNO: { type: 'string' },
    CODEID: { type: 'string' },
    NAMENV: { type: 'string' },
    CAREBYGRP: { type: 'string' },
    AUTOID: { type: 'integer'},
    DELTD: { type: 'string' },
    TXNUM: { type: 'string' },
    TXDATE: { type: 'string' },
    BUSDATE: { type: 'string' },
    BRID: { type: 'string' },
    TLTXCD: { type: 'string' },
    TXSTATUS: { type: 'string' },
    TXSTATUSCD: { type: 'string' },
    TXDESC: { type: 'string' },
    ACCTNO: { type: 'string' },
    AMT: { type: 'string' },
    TLID: { type: 'string' },
    CHID: { type: 'string' },
    CHKID: { type: 'string' },
    OFFID: { type: 'string' },
    TLNAME: { type: 'string' },
    CHNAME: { type: 'string' },
    CHKNAME: { type: 'string' },
    OFFNAME: { type: 'string' },
    TXTIME: { type: 'string' },
    OFFTIME: { type: 'string' },
    LVEL: { type: 'string' },
    DSTATUS: { type: 'string' },
    ACTION: { type: 'string' },
    VSDSTATUS: { type: "string" },
    VSDSTATUS_DESC: { type: "string" },
    VDSSTATUS_DESC_EN: { type: "string" }
  },
  updateOrCreate: function (criteria, values) {
    var self = this; // reference for use by callbacks

    // If no values were specified, use criteria
    if (!values) values = criteria.where ? criteria.where : criteria;

    return this.findOne(criteria).then(function (result) {
      if (result) {
        return self.update(criteria, values);
      } else {
        return self.create(values);
      }
    });
  },
};

