import fastify, { FastifyRequest, FastifyReply } from 'fastify';

const app = fastify({ logger: false });

interface Item {
  id: number;
  name: string;
  description?: string;
}

let items: Item[] = [];
let nextId = 1;

// GET /items
app.get('/items', async (request: FastifyRequest, reply: FastifyReply) => {
  return { items };
});

// POST /items
app.post('/items', async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, description } = request.body as {
    name: string;
    description?: string;
  };
  const item: Item = { id: nextId++, name, description };
  items.push(item);
  return item;
});

// PUT /items/:id
app.put('/items/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const itemId = parseInt(id);
  const index = items.findIndex((item) => item.id === itemId);

  if (index === -1) {
    reply.status(404);
    return { error: 'Not found' };
  }

  const { name, description } = request.body as {
    name: string;
    description?: string;
  };
  items[index] = { id: itemId, name, description };
  return items[index];
});

// DELETE /items/:id
app.delete(
  '/items/:id',
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const itemId = parseInt(id);
    const index = items.findIndex((item) => item.id === itemId);

    if (index === -1) {
      reply.status(404);
      return { error: 'Not found' };
    }

    items.splice(index, 1);
    reply.status(204);
    return;
  }
);

// GET /health
app.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
  return {
    status: 'ok',
    framework: 'fastify',
    timestamp: new Date().toISOString(),
  };
});

const PORT = 3002;

const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Fastify server running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
