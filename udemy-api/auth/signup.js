var mysqlconnection=require('../config')

module.exports.signup= (req, res) => {
    sql = "SELECT * FROM signup WHERE email=?";
    mysqlconnection.query(sql,[req.body.email],(err, rows, feilds) => {
      if (!err) {
        if(rows.length>0){
         res.json({
          status:false,
          message:'Email is already exists.'
         })
        }
        else
        {
          sql =
            "INSERT INTO signup(fullname,email,password,role) VALUES('" +
            req.body.fullname +
            "','" +
            req.body.email +
            "','" +
            req.body.password +
            "','" +
            req.body.role +
            "')";
          mysqlconnection.query(sql, (err, rows, feilds) => {
            if (!err) {
                res.json({
                    status:true,
                    data:rows,
                    message:'user registered sucessfully'
                })
            } else {
                res.json({
                    status:false,
                    message:'there are some error with query'
                
            })}
          });
        }
      }
      else console.log(err);
    });
  };
  
  