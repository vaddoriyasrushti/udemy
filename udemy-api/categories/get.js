var mysqlconnection= require('../config')

module.exports.getcategories = (req, res) => {
    sql = "SELECT * FROM udemy.categories";
    mysqlconnection.query(sql, (err, rows, feilds) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err)
        res.json({
          status:false,
          message:'there are some error with query'
      })
      };
    });
  };

module.exports.getcategoriesbyid =  (req, res) => {
    sql = "SELECT * FROM udemy.categories WHERE id=?";
    mysqlconnection.query(sql, [req.params.id], (err, rows, feilds) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err)
        res.json({
          status:false,
          message:'there are some error with query'
      
  })
      }
    });
  };
  