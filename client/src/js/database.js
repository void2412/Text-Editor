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

export const putDb = async (content) => {
	try{
		console.log('Adding content to the database');
		await initdb()
  		const todosDb = await openDB('jate', 1);
  		const tx = todosDb.transaction('jate', 'readwrite');
  		const store = tx.objectStore('jate');
		const currentDb = await store.getAll()
		if (currentDb.length > 0){
			store.clear()
		}
		const request = store.add({content:content})
  		const result = await request;
  		console.log('🚀 - data saved to the database', result);
  		return result
	}
	catch (e){
		return false
	}
};

export const getDb = async () => {
	try{
		console.log('Getting content from the database');
		const todosDb = await openDB('jate', 1);
		const tx = todosDb.transaction('jate', 'readonly');
		const store = tx.objectStore('jate');
		const request = store.getAll();
		const result = await request;
		return result[0].content
	}
	catch(e){
		return
	}	
};

initdb();
