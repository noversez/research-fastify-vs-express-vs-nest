import * as express from 'express';

const app = express();
app.use(express.json());

interface Item {
  id: number;
  name: string;
  description?: string;
}

let items: Item[] = [];
let nextId = 1;

app.get('/items', (req, res) => {
  res.json({ items });
});

app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const item: Item = { id: nextId++, name, description };
  items.push(item);
  res.json(item);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  const { name, description } = req.body;
  items[index] = { id, name, description };
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
  res.json({
    status: 'ok',
    framework: 'express',
    timestamp: new Date().toISOString(),
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
});
