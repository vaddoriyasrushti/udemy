var mysqlconnection= require('../config')

module.exports.postcartitem= (req, res) => {
    sql = "SELECT * FROM cart WHERE userid=? AND catid=?";
    mysqlconnection.query(sql,[req.body.userid,req.body.catid],(err, rows, feilds) => {
      if (!err) {
        if(rows.length>0){
          res.send("dulplicate value error")
        }
        else
        {
            sql =
            "INSERT INTO cart(userid,catid) VALUES('" +
            req.body.userid+
            "','" +
            req.body.catid +
            "')";
          mysqlconnection.query(sql, (err, rows, feilds) => {
              if (!err) {
              res.send(rows);
            } else console.log(err);
          });
        }
      }
        else {
         console.log(err)
        }
    });
  };
  