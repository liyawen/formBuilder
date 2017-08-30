const db = require('./db');

module.exports = {
  sendForm: (data, res) => {
    const formKey = data.formKey;
    const formName = data.formName;
    const formType = data.formType;
    const formData = data.formData;

    const sql = `insert into new_form_list (formKey, formName,
      formType, formData) values (${formKey},'${formName}',
      ${formType}, '${formData}') `;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ status: 0, msg: '创建成功' });
    });
  },
  getList: (res) => {
    const sql = 'select * from new_form_list';
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log('getList', result);
      res.send({ status: 0, msg: '查询成功', data: result });
    });
  },
  getFormData: (data, res) => {
    const sql = `select * from new_form_list WHERE id=${data}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log('getFormData', result);
      res.send({ status: 0, msg: '查询成功', data: result[0] });
    });
  },
};