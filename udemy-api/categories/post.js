var mysqlconnection= require('../config')

module.exports.postcategories= (req, res) => {
    sql = "SELECT * FROM udemy.categories WHERE categoriesname=?";
    mysqlconnection.query(sql,[req.body.categoriesname],(err, rows, feilds) => {
      if (!err) {
        if(rows.length>0){
          res.send("dulplicate value error")
        }
        else
        {
            sql =
            "INSERT INTO categories(categoriesname,categoriesicon,development) VALUES('" +
            req.body.categoriesname +
            "','" +
            req.body.categoriesicon +
            "','" +
            req.body.development +
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
  