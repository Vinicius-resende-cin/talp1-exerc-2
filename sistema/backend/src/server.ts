import { app } from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';

async function bootstrap(): Promise<void> {
  await connectDatabase();

  app.listen(env.port, () => {
    // Keeping startup logging minimal and deterministic.
    console.log(`Backend running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Server startup failed', error);
  process.exit(1);
});
