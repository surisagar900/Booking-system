const express = require('express')
const jwt = require('jsonwebtoken')

const mysql = require('mysql')
const bodyparser = require('body-parser')
const app = express()
//app.use(json())
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json())

const db   = mysql.createConnection({
     host : "localhost",
     user : "root",
     password : "",
     database : "movieticket",
     multipleStatements : true 
})
db.connect((err)=>{
    if(err)
        throw err;

    
   
        console.log('connection established')
    
})
/*app.get('/createdatabase' , (req,res)=>{
    const sql = 'CREATE DATABASE movieticket';
    db.query(sql,(err,result)=>{
        if(err)
            throw err
        
        
           
            console.log(result)
        
    })
})*/

app.listen(3000,()=>{
    console.log("we are live on port")
})

app.get('/user' , (req,res)=>{
    db.query('select * from users' ,(err,data)=>{
        if(data){
            res.json(data)
        }
        else{
            res.json(err)
        }
    })
})



app.get('/:id' , (req,res)=>{
    db.query('select * from users where id = ?',[req.params.id],(err,data)=>{
        if(data){
            res.json(data)
        }
        else{
            res.json(err)
        }
    })
})

app.delete('/test/:id' , (req,res)=>{
    db.query('DELETE FROM users WHERE id =  ?',[req.params.id],(err,data)=>{
        if(data){
            res.json('data deleted')
        }
        else{
            res.json(err)
        }
    })
})



app.post('/signup' , (req,res)=>{
        var id =  req.body.id;
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname =  req.body.lastname;
        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.password;
        
        var sql = `INSERT INTO users(id,username,firstname,lastname,email,phone,password) VALUES("${id}", "${username}", "${firstname}", "${lastname}", "${email}", "${phone}","${password}")`
        
        db.query(sql,(err,data)=>{
            if(data){
                res.json("data added")
                
            } 
            else{
                res.json('not sucess')
                console.log(err)
            }
        })

    })

    
    app.put('/update/:id' , (req,res)=>{
        
        var id =  req.params.id;
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname =  req.body.lastname;
        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.password;
        var sql = `UPDATE users SET username  = "${username}",firstname= "${firstname}", lastname = "${lastname}", email  ="${email}",phone  ="${phone}",password = "${password}" WHERE id = ${id}` 
        
        db.query(sql,(err,data)=>{
            if(data){
                res.json("data updated")
                
            } 
            else{
                res.json('not sucess')
                console.log(err)
            }
        })

    })
    app.post('/login' ,(req,res)=>{
        const username = req.body.username;
        const password = req.body.password;
        db.query('SELECT*FROM users WHERE username = ? and password = ?',[username,password],(err,data)=>{
            if(data.length>0){
              
                const token = jwt.sign({
                    //contactnumber:contactnumber,
                    //password:password
                  datas:data
                  
                  
                 },"TOKEN_SECRET=7bc78545b1a3923cc1e1e19523fd5c3f20b409509...",{
                    expiresIn : "1day"
                })
                  //token:token
                 res.json( {data:data[0].firstname,token:token})
               
                 
             
            }
           
            else{res.json('login failed')}
        })
    })
    
