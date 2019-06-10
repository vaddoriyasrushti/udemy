var mysqlconnection=require('../config')

module.exports.deletecartitem = (req, res) => {
    sql = "DELETE FROM cart WHERE userid=? AND catid=?";
    mysqlconnection.query(sql, [req.params.userid,req.params.catid], (err, rows, feilds) => {
      if (!err) {
        res.send("remove item successfully");
      } else console.log(err);
    });
  };