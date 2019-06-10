var mysqlconnection= require('../config')

module.exports.putcategories=(req, res) => {
  sql = "SELECT * FROM udemy.categories WHERE categoriesname=?";
  mysqlconnection.query(sql,[req.body.categoriesname],(err, rows, feilds) => {
    console.log("in select")
    if (!err) {
      if(rows.length>0){

        res.send("dulplicate value error")
      }
      else
      {
        sql =
          "UPDATE categories SET categoriesname='"+req.body.categoriesname+"',categoriesicon='"+req.body.categoriesicon+"',development='"+req.body.development+"'WHERE id=?";
          
        mysqlconnection.query(sql,[req.params.id],(err, rows, feilds) => {
          console.log("in upadate")
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
  

 