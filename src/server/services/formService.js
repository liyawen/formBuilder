const db = require('./db');

module.exports = {
  sendForm: function (data, res) {
    const formKey = data.formKey;
    const formName = data.formName;
    const formType = data.formType;
    const formData = data.formData;

    const sql = `insert into project (formKey, formName,
      formType, formData) values (${formKey},${formName},
      ${formType}, ${formData}) `;
    db.query(sql, function(err) {
      if(err) throw err;
      res.send({ status: 0, info: '创建成功' });
    })
  },
}