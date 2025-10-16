import { rm } from 'fs/promises';
import { join } from 'path';
global.beforeAll(async () => {
  try {
    await rm(join(__dirname, '..', 'db.sqlite'));
  } catch (error) {}
});
