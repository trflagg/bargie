const mongoose = require('mongoose');

module.exports = {
connectToTestDB: async function() {
  await connect();
  await clearDatabase();
},

disconnectToTestDB: async function() {
  await mongoose.disconnect();
}
}

let connection = null;

function connect() {
  return new Promise((resolve, reject) => {
    if (connection) {
      return resolve();
    }

    const mongoUri = process.env.MONGO_URL;

    mongoose.Promise = Promise;

    const options = {
        auto_reconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
    };

    mongoose.connect(mongoUri, options);

    connection = mongoose.connection;

    connection
      .once('open', resolve)
      .on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(e);

          mongoose.connect(mongoUri, options);
        }

        console.log(e);
        reject(e);
      });
  });
}

function clearDatabase() {
  return new Promise(resolve => {
    let cont = 0;
    let max = Object.keys(mongoose.connection.collections).length;
    for (const i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {
        cont++;
        if(cont >= max) {
          resolve();
        }
      });
    }
  });
}
