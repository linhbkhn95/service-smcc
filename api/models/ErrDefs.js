/**
 * ErrDefs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		ERRNUM: {
			type: 'string',primaryKey:true
		},
		ERRDESC: {
			type: 'string'
		},
		EN_ERRDESC: {
			type: 'string'
		},
		MODCODE: {
			type: 'string'
		}
	},
	syncCreate: function (values) {
		var self = this; // reference for use by callbacks
		return self.create(values).then((record) => {
			return record;
		});
	},
	findErr: async function (errnum, errmsg) {
		var errdef = await this.findOne({ ERRNUM: errnum });
		if (errnum === 0) {
			return 'Thành công';
		}
		if (errdef) {
			return errdef.ERRDESC;
		} else {
			return errnum + ' - ' + errmsg;
		}
	},
};

