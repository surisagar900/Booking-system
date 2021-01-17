const express = require('express')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const bodyparser = require('body-parser')
var cors = require('cors');
const app = express()
//app.use(json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "movieticket",
    multipleStatements: true
})
db.connect((err) => {
    if (err)
        throw err;
    console.log('connection established')
})

app.listen(3000, () => {
    console.log("we are live on port")
})

app.get('/user', (req, res) => {
    db.query('select * from users', (err, data) => {
        if (data) {
            res.json(data)
        }
        else {
            res.status(401).json({ message: "error" })
        }
    })
})

app.get('/:id', (req, res) => {
    db.query('select * from users where id = ?', [req.params.id], (err, data) => {
        if (data.length > 0) {
            res.json(data)
        }
        else {
            res.status(400).json({ message: "no user" })
        }
    })
})

app.delete('/test/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id =  ?', [req.params.id], (err, data) => {
        if (data.length > 0) {
            res.json('data deleted')
        }
        else {
            res.status(400).json({ message: "not deleted" })
        }
    })
})

app.post('/signup', (req, res) => {
    var id = req.body.id;
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    var checkUser = `SELECT * FROM users WHERE username = '${username}'`;
    db.query(checkUser, (err, data) => {
        if (data.length == 0) {
            var sql = `INSERT INTO users(id,username,firstname,lastname,email,phone,password) VALUES("${id}", "${username}", "${firstname}", "${lastname}", "${email}", "${phone}","${password}")`
            db.query(sql, (err, data) => {
                if (data) {
                    var getUserData = `SELECT * FROM users WHERE id = '${data.insertId}'`;
                    db.query(getUserData, (err, data) => {
                        const token = jwt.sign({
                            datas: data[0]
                        }, "TOKEN_SECRET=7bc78545b1a3923cc1e1e19523fd5c3f20b409509...", {
                            expiresIn: "1day"
                        })
                        //token:token
                        res.json({ id: data[0].id, token: token })
                    })

                }
                else {
                    res.status(402).json({ message: "unsucessfull" })
                }
            })
        }
        else {
            res.status(400).json({ message: "Username already taken" })
        }
    })
})

app.put('/update/:id', (req, res) => {
    var id = req.params.id;
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    var sql = `UPDATE users SET username  = "${username}",firstname= "${firstname}", lastname = "${lastname}", email  ="${email}",phone  ="${phone}",password = "${password}" WHERE id = ${id}`
    db.query(sql, (err, data) => {
        if (data) {
            res.json("data updated")
        }
        else {
            res.status(400).json({ message: "fail to update" })
        }
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query('SELECT*FROM users WHERE username = ? and password = ?', [username, password], (err, data) => {
        if (data.length > 0) {
            const token = jwt.sign({
                //contactnumber:contactnumber,
                //password:password
                datas: data
            }, "TOKEN_SECRET=7bc78545b1a3923cc1e1e19523fd5c3f20b409509...", {
                expiresIn: "1day"
            })
            //token:token
            res.json({ id: data[0].id, token: token })
        }
        else {
            res.status(401).json({ message: "login failed" })
        }
    })
})

app.post('/booking', (req, res) => {
    var movie = req.body.movie;
    var id = req.body.id;
    var seat = req.body.seat;
    var name = req.body.name;
    var sql = `INSERT into book (movie,id,seat,name) values("${movie}","${id}","${seat}","${name}")`
    db.query(sql, (err, data) => {
        if (data) {
            res.json("data added")
        }
        else {
            res.status(400).json({ message: "data not added" })
        }
    })
})

app.get("/bookinghistory/:id", (req, res) => {
    db.query('SELECT * FROM book where id =?', [req.params.id], (err, data) => {
        if (data.length > 0) {
            res.json(data)
        }
        else {
            res.status(400).json({ message: "no such id" })
        }
    })
})