import { createServer } from "./server.js";


const server = await createServer();

// Start the server
const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    
    console.log('Server is running on http://localhost:3000');

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
