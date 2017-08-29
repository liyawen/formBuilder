const db = require('./db');

module.exports = {
  sendForm: (data, res) => {
    console.log('services', data);
    const formKey = data.formKey;
    const formName = data.formName;
    const formType = data.formType;
    const formData = data.formData;

    const sql = `insert into new_form_list (formKey, formName,
      formType, formData) values (${formKey},'${formName}',
      ${formType}, '${formData}') `;
    db.query(sql, (err, result) => {
      console.log('sql', sql);
      if (err) throw err;
      console.log('result', result)
      res.send({ status: 0, info: '创建成功' });
    });
  },
};