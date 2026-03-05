import './main.js';
import { load } from './ts/features/libraryMoviesController.js';

async function bootstrapLibrary() {
  load();
}

bootstrapLibrary();
