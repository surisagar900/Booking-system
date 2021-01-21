const express = require('express')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const bodyparser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
var cors = require('cors')
const app = express()
//app.use(json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cors());

const DIR = "./uploads"

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

const storage = multer.diskStorage({
    destination:(req, res, cb) => {
      if(!fs.existsSync(DIR)){
          fs.mkdirSync(DIR);
      }
      cb(null, DIR)
    },
    filename:(req, file, cb) => {
       cb(null,file.originalname);
    }
  });
  const upload = multer({
    storage : storage,
    fileFilter: function(req, file, cb){
    checkFileType(file,cb)
    }
  })
  //check filetype
  function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png|gif/;
    //check mime
    const mimetype=filetypes.test(file.mimetype);
    if(mimetype){
       cb(null,true);
    }
    else{
      cb(new Error('Images only!'),false);
    }
  }

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

app.get('/user/:id', (req, res) => {
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
    //var id = req.body.id;
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    var checkUser = `SELECT * FROM users WHERE username = '${username}'`;
    db.query(checkUser, (err, data) => {
        if (data.length == 0) {
            var sql = `INSERT INTO users(username,firstname,lastname,email,phone,password) VALUES("${username}", "${firstname}", "${lastname}", "${email}", "${phone}","${password}")`
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
                datas: data
            }, "TOKEN_SECRET=7bc78545b1a3923cc1e1e19523fd5c3f20b409509...", {
                expiresIn: "1day"
            })
            res.json({ id: data[0].id, token: token })
        }
        else {
            res.status(401).json({ message: "Invalid credentials" })
        }
    })
})

app.get('/getticket/:bookingId', (req, res) => {
    var bookingId = req.params.bookingId;
    var op =`SELECT book.bookingId, book.seat, book.price, book.name, book.movieId, book.bookedOn, movies.movieName FROM
    book INNER JOIN movies on book.movieId = movies.movieId WHERE book.bookingId = "${bookingId}"`
    db.query(op, (err, data) => {
        if(data.length > 0){
          res.json(data[0]);
        } else {
          res.status(400).json({message : "No booking exists !!"})
        }
    })
})

app.post('/booking/:movieId', (req, res) => {
    var movieId = req.params.movieId;
    var seat = req.body.seat;
    var price = req.body.price;
    var name = req.body.name;
    var sql = `INSERT INTO book (movieId,seat,name,price) values("${movieId}","${seat}","${name}","${price}")`
    db.query(sql, (err, data) => {
        if (data) {
            res.json("Hurray, Seats booked!!")
        }
        else {
            res.status(400).json(err)
        }
    })
})

app.get("/bookedseats/:movieId", (req, res) => {
    db.query('SELECT seat FROM book WHERE movieId = ?', [req.params.movieId], (err, data) =>{
       if(data.length > 0){
           var seats=[];
           for(let i=0; i < data.length; i++){
               seats[i]= data[i].seat;
           }
           res.json({"bookedSeats" : seats})
       } else {
           res.status(400).json({message : "No booked seats"})
       }
    })
})

app.get("/bookinghistory/:movieId", (req, res) => {
    db.query('SELECT * FROM book where movieId = ?', [req.params.movieId], (err, data) => {
        if (data.length > 0) {
            res.json(data)
        } else {
            res.status(400).json({ message: "No bookings yet for this movie" })
        }
    })
})

app.delete("/clearbooking/:movieId", (req,res) => {
    db.query('DELETE FROM book WHERE movieId = ?', [req.params.movieId], (err, data)=>{
        if(data.affectedRows > 0){
            res.json({message : "All bookings cleared for this movie !!"});
        } else{
            res.status(400).json({message : "Nothing to clear for this movie !!"});
        }
    })
})

app.get("/listmovie/:movieId", (req, res) => {
    db.query('SELECT * FROM movies WHERE movieId = ?', [req.params.movieId], (er, data) =>{
         if(data.length > 0){
             res.json(data);
         } else {
             res.status(400).json({message : "Unable to view movie !!. Check movie exists or not."})
         }
    })

})

app.get("/listall", (req, res) => {
    db.query('select * from movies', (err, data) => {
        if(data) {
	       res.json(data)
        } else {
         res.status(400).json({ message: "No movies, Add a movie first !!"})
        }
    })
})

app.post("/add", upload.single('movieImg'), (req, res) => {
    //MovieDd is in AUTO INCREMENT
    if(!req.file){
        res.send("error no image")
        return
    }
    var movieName =  req.body.movieName;
    var movieDesc =  req.body.movieDesc;
    var moviePoster = req.body.moviePoster;
    var movieRating = req.body.movieRating;
    var movieLength = req.body.movieLength;
    var movieImg    = req.file.filename;
    var store = `INSERT INTO movies (movieName,movieDesc,moviePoster,movieRating,movieLength,movieImg) values("${movieName}","${movieDesc}","${moviePoster}","${movieRating}","${movieLength}","${movieImg}")`
    db.query(store, (err, data) => {
        if(data){
	       res.json({message: "Movied Added !!"})
	    }
        else {
           res.status(400).json(err)
        }
    })
})


app.put("/edit/:movieId", upload.single('movieImg'), (req, res) => {
    var movieId   =  req.params.movieId;
    var movieName =  req.body.movieName;
    var movieDesc =  req.body.movieDesc;
    var moviePoster = req.body.moviePoster;
    var movieRating = req.body.movieRating;
    var movieLength = req.body.movieLength;
    var movieImg    = req.file.filename;
    var set = `UPDATE movies SET movieName = "${movieName}", movieDesc = "${movieDesc}", moviePoster = "${moviePoster}", movieRating = "${movieRating}", movieLength = "${movieLength}", movieImg = "${movieImg}" WHERE movieId = ${movieId}`
    db.query(set, (err, data) => {
	    if(data) {
          res.json({message : "Movie Updated !!"})
	      return
	    }
        res.status(400).json(err)
    })
})


app.delete("/moviedelete/:movieId", (req,res) => {
    db.query('DELETE FROM movies WHERE movieId = ?', [req.params.movieId], (err, data) => {
        if(err){
            if(err.errno == "1451"){ //Error due to foreign key constraint
                res.status(400).json({message : "Booking exists for this moive. Clear booking for this movie first !!"})
            } else { //Any other error
                res.status(400).json({message : err})
            }
        } else if (data.affectedRows > 0){
	      res.json({message : "Movie Deleted !!"})
	    } else {
          res.status(400).json({message : "Movie doesn't exist, cannot perform deletion !!"})
        }
     })
})
