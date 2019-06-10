var mysqlconnection= require('../config')

module.exports.deletecategories= (req, res) => {
    sql = "DELETE FROM categories WHERE id=?";
    mysqlconnection.query(sql, [req.params.id], (err, rows, feilds) => {
      if (!err) {
        res.send("id: "+req.params.id+" deleted successfully");
      } else console.log(err);
    });
};
  