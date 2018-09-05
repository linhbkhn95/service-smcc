/**
 * Account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    SHORTNAME:{
      type:"string"
    },
    TLID:{
        type:"string"
      },
    CUSTID:{
        type:"string",
        primaryKey:true
      },
    CUSTODYCD:{
          type:"string"
        },
    SID:{
          type:"string"
        },
    FIRSTNAME:{
          type:"string"
        },
    MIDDLENAME:{
          type:"string"
        },
    LASTNAME:{
          type:"string"
        },
    FULLNAME:{
          type:"string"
        },
    ACCTYPE:{
          type:"string"
        },
    CUSTTYPE:{
          type:"string"
        },
    GRINVESTOR:{
          type:"string"
        },
    SEX:{
          type:"string"
        },
    BIRTHDATE:{
          type:"string"
        },
    IDTYPE:{
          type:"string"
        },
    IDCODE:{
          type:"string"
        },
    IDDATE:{
          type:"string"
        },
    IDEXPDATED:{
          type:"string"
        },
    IDPLACE:{
          type:"string"
        },
    TRADINGCODE:{
          type:"string"
        },
    TRADINGDATE:{
          type:"string"
        },
    TAXNO:{
          type:"string"
        },
    REGADDRESS:{
          type:"string"
        },
    ADDRESS:{
          type:"string"
        },
    COUNTRY:{
          type:"string"
        },
    PROVINCE:{
          type:"string"
        },
    PHONE:{
          type:"string"
        },
    MOBILE:{
          type:"string"
        },
    EMAIL:{
          type:"string"
        },
    DBCODE:{
          type:"string"
        },
    STATUS:{
          type:"string"
        },
    PSTATUS:{
          type:"string"
        },
    LASTCHANGE:{
          type:"string"
        },
    BANKACC:{
          type:"string"
        },
    BANKCODE:{
          type:"string"
        },
    CITYBANK:{
          type:"string"
        },
    BANKACNAME:{
          type:"string"
        },
    REFNAME1:{
          type:"string"
        },
    REFPOST1:{
          type:"string"
        },
    REFMOBILE1:{
          type:"string"
        },
    REFNAME2:{
          type:"string"
        },
    REFPOST2:{
          type:"string"
        },
    REFMOBILE2:{
      type:"string"
    },
    ROLE:{
      type:"string"
    },
    VIA:{
      type:"string"
    },
    CASIGNATURE:{
      type:"string"
    },
    VDSSTATUS:{
      type:"string"
    },
    VSDSTATUS_DESC:{
      type:"string"
    },
    VDSSTATUS_DESC_EN:{
      type:"string"
    },
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
