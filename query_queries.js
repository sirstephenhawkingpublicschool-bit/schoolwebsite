const fetch = require('node-fetch');

const query = `
  {
    __type(name: "Query") {
      fields {
        name
      }
    }
  }
`;

fetch('https://ap-south-1.cdn.hygraph.com/content/cmp12q1jr00y306uug5bps8xr/master', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then(res => res.json())
  .then(data => {
    console.log(JSON.stringify(data.data.__type.fields.map(f => f.name), null, 2));
  })
  .catch(console.error);
