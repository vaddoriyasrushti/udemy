var mysqlconnection= require('../config')

module.exports.getcartitem = (req, res) => {
    sql = "SELECT * FROM cart";
    mysqlconnection.query(sql, (err, rows, feilds) => {
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

module.exports.getcartitembyid =  (req, res) => {
    sql = "SELECT * FROM cart WHERE userid=?";
    mysqlconnection.query(sql, [req.params.userid], (err, rows, feilds) => {
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
  