const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "purelux",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

app.get('/', (req, res) => {
  return res.json("Backend is running");
});

//  USER AUTHENTICATION 

// REGISTER
app.post("/api/register", (req, res) => {
  const { name, email, password, phone, address, city } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const q = "INSERT INTO users (name, email, password, phone, address, city) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(q, [name, email, password, phone, address, city], (err, data) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Registration failed' });
    }
    return res.json({ message: 'User registered successfully!', userId: data.insertId });
  });
});

// login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json({ error: 'Login failed' });
    if (data.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = data[0];
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    delete user.password;
    return res.json({ message: 'Login successful!', user });
  });
});

// fetch user profile
app.get("/api/user/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT id, name, email, phone, address, city FROM users WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json({ error: 'Error fetching user' });
    if (data.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json(data[0]);
  });
});

// Update user profile
app.put("/api/user/:id", (req, res) => {
  const id = req.params.id;
  const { name, phone, address, city } = req.body;
  const q = "UPDATE users SET name = ?, phone = ?, address = ?, city = ? WHERE id = ?";
  db.query(q, [name, phone, address, city, id], (err, data) => {
    if (err) return res.status(500).json({ error: 'Error updating user' });
    return res.json({ message: 'Profile updated successfully' });
  });
});

// PRODUCTS

// fetchall products
app.get('/products', (req, res) => {
  db.query("SELECT * FROM products", (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json(data);
  });
});

// fetch single product
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE productId = ?", [id], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json(data);
  });
});

// Add product with image
app.post("/products", upload.single('image'), (req, res) => {
  const { name, brand, category, price, description } = req.body;

  if (!name || !brand || !price || !category) {
    return res.status(400).json({ error: 'Name, brand, price, and category are required' });
  }

  const image_url = req.file ? `/uploads/${req.file.filename}` : null;
  const q = "INSERT INTO products (name, brand, category, price, image_url, description) VALUES (?,?,?,?,?,?)";
  db.query(q, [name, brand, category, price, image_url, description], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json({ message: 'Product added!', productId: data.insertId });
  });
});

// Update product
app.put("/products/:id", upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { name, brand, price, category, description } = req.body;

  if (!name || !brand || !price || !category) {
    return res.status(400).json({ error: 'Name, brand, price, and category are required' });
  }

  const image_url = req.file ? `/uploads/${req.file.filename}` : req.body.existing_image;
  const q = "UPDATE products SET name=?, brand=?, price=?, category=?, image_url=?, description=? WHERE productId=?";
  db.query(q, [name, brand, price, category, image_url, description, id], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json({ message: 'Product updated!' });
  });
});

//delete product
app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE productId = ?", [id], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json({ message: 'Product deleted!' });
  });
});

//ORDERS

// fetch all orders
app.get('/orders', (req, res) => {
  db.query("SELECT * FROM orders", (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json(data);
  });
});

// fetch single order
app.get('/orders/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM orders WHERE id = ?", [id], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json(data);
  });
});

// Create order
app.post("/orders", (req, res) => {
  const { customer_name, customer_email, customer_phone, shipping_address, city, total, items } = req.body;

  if (!customer_name || !customer_email || !total) {
    return res.status(400).json({ error: 'Name, email, and total are required' });
  }

  const q = "INSERT INTO orders (customer_name, customer_email, customer_phone, shipping_address, city, total, items) VALUES (?,?,?,?,?,?,?)";
  db.query(q, [customer_name, customer_email, customer_phone, shipping_address, city, total, items], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json({ message: 'Order placed!', orderId: data.insertId });
  });
});

// PUT - Update order
app.put("/orders/:id", (req, res) => {
  const id = req.params.id;
  const { customer_name, customer_email, customer_phone, shipping_address, city, total, items } = req.body;
  const q = "UPDATE orders SET customer_name=?, customer_email=?, customer_phone=?, shipping_address=?, city=?, total=?, items=? WHERE id=?";
  db.query(q, [customer_name, customer_email, customer_phone, shipping_address, city, total, items, id], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json({ message: 'Order updated!' });
  });
});

// delete order
app.delete("/orders/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM orders WHERE id = ?", [id], (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    return res.json({ message: 'Order deleted!' });
  });
});


app.listen(8083, () => {
  console.log("Server running on port 8083");
});