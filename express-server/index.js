import express from 'express';

const app = express();
app.use(express.json());

let items = [];
let nextId = 1;

app.get('/items', (req, res) => {
  res.json({ items });
});

app.post('/items', (req, res) => {
  const item = { id: nextId++, ...req.body };
  items.push(item);
  res.json(item);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  items[index] = { id, ...req.body };
  res.json(items[index]);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  items.splice(index, 1);
  res.status(204).send();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', framework: 'express' });
});

app.listen(3001, () => {
  console.log('Express server running on port 3001');
});
