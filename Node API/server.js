
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to read db.json
function readDB() {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data);
}

// GET all products
app.get('/products', (req, res) => {
  const db = readDB();
  res.json(db.products);
});

// GET a product by ID
app.get('/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id === req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ error: 'Product not found' });
});

// POST a new product
app.post('/products', (req, res) => {
  const db = readDB();
  const newProduct = req.body;
  db.products.push(newProduct);
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  res.status(201).json(newProduct);
});

// PUT update a product
app.put('/products/:id', (req, res) => {
  const db = readDB();
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  db.products[index] = { ...db.products[index], ...req.body };
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  res.json(db.products[index]);
});

// DELETE a product
app.delete('/products/:id', (req, res) => {
  const db = readDB();
  const newProducts = db.products.filter(p => p.id !== req.params.id);
  db.products = newProducts;
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});