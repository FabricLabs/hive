'use strict';

const Fabric = require('fabric');
const server = new Fabric.HTTP();

async function main () {
  await server.define('Room', {
    properties: {
      name: { type: String /*, maxLength: 80*/ }
    }
  });
  
  await server.start();
}

main();
