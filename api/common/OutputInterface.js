module.exports = {
    jsonAPIOutput: function (errCode, errMsg, data) {
        return { "EC": errCode, "EM": errMsg, "DT": data };
    },
    errServer: function (err) {
        return this.jsonAPIOutput(-101338, 'Webserver gian doan', err);
    },
    success: function (data) {
        return this.jsonAPIOutput(0, 'Success', data);
    },
}