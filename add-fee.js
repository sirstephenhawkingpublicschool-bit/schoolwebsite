const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_MANAGEMENT_TOKEN;

const query = `
  mutation {
    createFeeStructure(data: { serialNo: 11, className: "8TH", monthlyFee: "1800/-" }) {
      id
    }
  }
`;

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(console.error);
