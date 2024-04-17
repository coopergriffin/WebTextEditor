import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Saving to the database', content);
  // Open a connection to the 'jate' database with version 1
  const db = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readwrite');
  // Open up the desired object store
  const store = tx.objectStore('jate');
  // Use the .put() method to update the content in the database
  const request = store.put({ id: 1, value: content });
  // Confirm the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
