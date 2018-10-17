// Stolen from https://github.com/vladgolubev/jest-mongodb/blob/master/teardown.js
module.exports = async function() {
    console.log('Teardown mongod');
    await global.__MONGOD__.stop();
};
