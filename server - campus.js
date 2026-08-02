const express = require('express'); 
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get('/', (req, res) => {
  return  res.json("Backend is running");
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"liu",
  })  ;

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

app.get('/students', (req, res) => {
  const sql = "SELECT StdID, Fname, Lname, Email ,   Description , Address FROM students s inner join major m on s.Major = m.MajorCode ";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
// create API to get one single student record 
    app.get('/students/onerecord/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM students WHERE StdID = ?";
    
    db.query(sql, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({ message: "Record not found" });
      res.json(data);
    });
  });

app.get('/majors', (req, res) => {
  const sql = "SELECT * FROM major";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// create API to delete one student record 
app.delete("/students/onerecord/:id", (req, res) => {
  const id = req.params.id;
  console.log (id);
  const q = " DELETE FROM students WHERE StdID = ? ";

  db.query(q, [id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


// create API to update  one student record 
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
    const q = "UPDATE students SET `Fname`= ?, `Lname`= ?, `Email`= ?, `Major`= ?, `Address`= ?  WHERE StdID = ?";
    const values = [
    req.body.fname,
    req.body.lname,
    req.body.email,
    req.body.major,
    req.body.address,
    
   
  ];
 
  db.query(q, [...values,id], (err, data) => {
    if (err)  { console.log( err); return res.send(err); }
    else {     return res.json(data); }
  });
});

// create API to insert a new record 
app.post("/students",  (req, res) => {
  
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const major = req.body.major;
  const address = req.body.address;
  
 // console.log(image);
  //console.log(lname);
  //console.log([fname,lname,email,major,address,image]);
  const q = "INSERT INTO students(`Fname`, `Lname`, `Email`, `Major`,`Address`) VALUES (?,?,?,?,?)";

  db.query(q, [fname,lname,email,major,address], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});



app.listen(8083, () => {
  console.log("Connected to thebackend.");
});



console.log("Before listen");
