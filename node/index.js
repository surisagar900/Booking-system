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

// we need to enter time for how long token exist, and here convert time into ms
const tokenExpiresInMiliSeconds = 86400000 + 'ms'; // equals to 1 day
const userRole = {
    public: 1,
    admin: 2
}

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

//---------------------------------------------------------------------------------------------------------------------
// Get All Users
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

//---------------------------------------------------------------------------------------------------------------------
// Get Specific User
app.get('user/:id', (req, res) => {
    db.query('select * from users where id = ?', [req.params.id], (err, data) => {
        if (data.length > 0) {
            res.json(data)
        }
        else {
            res.status(400).json({ message: "no user" })
        }
    })
})

//---------------------------------------------------------------------------------------------------------------------
// Delete Specific User
app.delete('user/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id =  ?', [req.params.id], (err, data) => {
        if (data.length > 0) {
            res.json('data deleted')
        }
        else {
            res.status(400).json({ message: "not deleted" })
        }
    })
})

//---------------------------------------------------------------------------------------------------------------------
// Add User
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
                            expiresIn: tokenExpiresInMiliSeconds
                        })
                        //token:token
                        res.json({ id: data[0].id, token: token, expiresIn: tokenExpiresInMiliSeconds, role: userRole.public })
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

//---------------------------------------------------------------------------------------------------------------------
// Update Specific User
app.put('user/:id', (req, res) => {
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

//---------------------------------------------------------------------------------------------------------------------
// Login Public User
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query('SELECT*FROM users WHERE username = ? and password = ?', [username, password], (err, data) => {
        if (data.length > 0) {
            const token = jwt.sign({
                datas: data
            }, "TOKEN_SECRET=7bc78545b1a3923cc1e1e19523fd5c3f20b409509...", {
                expiresIn: tokenExpiresInMiliSeconds
            })
            res.json({ id: data[0].id, token: token, expiresIn: tokenExpiresInMiliSeconds, role: userRole.public })
        }
        else {
            res.status(401).json({ message: "Invalid credentials" })
        }
    })
})

//---------------------------------------------------------------------------------------------------------------------
// Book Movie
app.post('/booking', (req, res) => {
    var movie = req.body.movie;
    var seat = req.body.seat;
    var name = req.body.name;
    console.log(req.body);
    var sql = `INSERT INTO book (movie,seat,name) values("${movie}","${seat}","${name}")`
    db.query(sql, (err, data) => {
        console.log(data);
        console.log(err);
        if (data) {
            res.json("Movie booked!!")
        }
        else {
            res.status(400).json({ message: "data not added" })
        }
    })
})

//---------------------------------------------------------------------------------------------------------------------
// get booking history
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

//---------------------------------------------------------------------------------------------------------------------
// signup and login api for admin
app.post("/adminsignup", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var sql = `INSERT into admin(username,password)values("${username}","${password}")`
    db.query(sql, (err, data) => {
        if (data) {
            res.json('admin created')
        }
        else {
            res.status(400).json({ message: "data added" })
        }
    })
})

app.post("/adminlogin", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    db.query('SELECT*FROM admin WHERE username = ? and password = ?', [username, password], (err, data) => {
        if (data.length > 0) {
            const token = jwt.sign({
                datas: data
            }, "TOKEN_SECRET=7bc78545b1a3923cc1e1e19523fd5c3f20b409509...", {
                expiresIn: tokenExpiresInMiliSeconds
            })
            //token:token
            res.json({ id: data[0].id, token: token, expiresIn: tokenExpiresInMiliSeconds, role: userRole.admin })
        }
        else {
            res.status(400).json({ message: "no such admin exists" })
            console.log(err)
        }
    })
})