const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
let items = [];

//Create
app.post("/items", (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).send(`Item added: ${JSON.stringify(item)}`);
});

//getAll
app.get("/items", (req, res) => {
  res.status(200).json(items);
});

//getById
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

//update
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((i) => i.id === id);

  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    res.status(200).json(items[index]);
  } else {
    res.status(404).send("Item not found");
  }
});

//delete
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((i) => i.id === id);

  if (index !== -1) {
    items.splice(index, 1);
    res.status(200).send("Item deleted");
  } else {
    res.status(404).send("Item not found");
  }
});
