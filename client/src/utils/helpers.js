export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}

export function idbPromise(storeName, method, object) {
  // console.log(`StoreName: ${storeName}, Method: ${method}, Object: ${object}`);
  return new Promise((resolve, reject) => {
    // console.log("1");
    const request = window.indexedDB.open('VinylVibes', 1);
    // console.log("2");
    let db, tx, store;
    // console.log("3");
    request.onupgradeneeded = function(e) {
      // console.log("4");
      const db = request.result;
      // console.log("5");
      db.createObjectStore('albums', { keyPath: '_id' });
      // console.log("7");
      db.createObjectStore('categories', { keyPath: '_id' });
      // console.log("8");
      db.createObjectStore('genres', { keyPath: '_id' });
      // console.log("9");
      db.createObjectStore('cart', { keyPath: '_id' });
      // console.log("10");
    };

    request.onerror = function(e) {
      // console.log("11");
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      // console.log("12");
      db = request.result;
      // console.log("13");
      tx = db.transaction(storeName, 'readwrite');
      // console.log("14");
      store = tx.objectStore(storeName);
      // console.log("15");

      db.onerror = function(e) {
        // console.log("16");
        console.log('error', e);
      };

      switch (method) {
        case 'put':
          // console.log("17");
          store.put(object);
          // console.log("18");
          resolve(object);
          // console.log("19");
          break;
        case 'get':
          // console.log("20");
          const all = store.getAll();
          // console.log("21");
          all.onsuccess = function() {
            // console.log("23");
            resolve(all.result);
            // console.log("24");
          };
          break;
        case 'delete':
          // console.log("25");
          store.delete(object._id);
          // console.log("26");
          break;
        default:
          // console.log("27");
          console.log('No valid method');
          // console.log("28");
          break;
      }

      tx.oncomplete = function() {
        // console.log("29");
        db.close();
        // console.log("30");
      };
    };
  });
}
