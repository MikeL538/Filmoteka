import './main.js';
import { load } from './ts/features/libraryMoviesController.js';
// import { ensureDevLoginAndSyncLists } from './ts/features/devAuthSync.js';
// import { initDevAuthSync } from './ts/features/devAuthSync.js';
async function bootstrapLibrary() {
  // initDevAuthSync();
  // await ensureDevLoginAndSyncLists();
  load();
}

bootstrapLibrary();
