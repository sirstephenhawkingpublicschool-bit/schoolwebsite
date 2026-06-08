const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

const endpoint = process.env.HYGRAPH_ENDPOINT;

const query1 = `
  query {
    feeStructures(orderBy: serialNo_ASC) {
      serialNo
    }
  }
`;

const query2 = `
  query {
    feeStructures(first: 100, orderBy: serialNo_ASC) {
      serialNo
    }
  }
`;

Promise.all([
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query1 })
  }).then(r => r.json()),
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query2 })
  }).then(r => r.json())
]).then(([res1, res2]) => {
  console.log("Default limit returned items:", res1.data.feeStructures.length);
  console.log("first: 100 limit returned items:", res2.data.feeStructures.length);
});
