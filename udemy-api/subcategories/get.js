var mysqlconnection=require('../config')

module.exports.getsubcategories= (req, res) => {
    sql = "SELECT * FROM subcategories";
    mysqlconnection.query(sql,(err, rows, feilds) => {
      if (!err) {
        res.send(rows);
      } else console.log(err);
    });
  };
module.exports.getsubcategoriesbyname=  (req, res) => {
    sql = "SELECT * FROM subcategories WHERE catname=?";
    mysqlconnection.query(sql,[req.params.catname],(err, rows, feilds) => {
      if (!err) {
        res.send(rows);
      } else console.log(err);
    });
  };
module.exports.getsubcategoriesbyid =  (req, res) => {
    sql = "SELECT * FROM subcategories WHERE id=?";
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
