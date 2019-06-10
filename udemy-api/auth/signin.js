var mysqlconnection=require('../config')

module.exports.signin = (req, res) => {
    var email=req.body.email;
    var password=req.body.password;
    var role=req.body.role;
    mysqlconnection.query('SELECT * FROM signup WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password && role==results[0].role){
                res.json({
                    status:true,
                    user:results,
                    message:'successfully authenticated'
                })
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}