var assert = require('assert');
var Fabric = require('fabric');

describe('Hive', function () {
  it('should start correctly', async function () {
    let server = new Fabric.HTTP();
    await server.start();
    assert.ok(server);
    await server.stop();
  });

  it('should store and retrieve content', async function () {
    let server = new Fabric.HTTP();
    let remote = new Fabric.Remote({
      host: 'localhost:3000',
      secure: false
    });

    await server.define('Widget', {
      properties: {
        name: { type: String }
      },
      routes: {
        query: '/widgets'
      }
    });

    await server.start();

    let sample = { name: 'foobar' };
    let result = await remote._POST('/widgets', sample);
    let vector = new Fabric.Vector(sample);

    vector._sign();

    assert.equal(vector['@id'], result['@id']);

    await server.stop();
  });
});
