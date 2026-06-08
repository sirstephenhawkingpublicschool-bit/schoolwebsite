const fetch = require('node-fetch');

const query = `
  {
    __schema {
      types {
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
    const types = data.data.__schema.types
      .map(t => t.name)
      .filter(n => !n.startsWith('__') && !n.includes('Input') && !n.includes('Connection') && !n.includes('Edge') && !n.includes('Payload') && !n.includes('Where') && !n.includes('OrderBy'));
    console.log(types.filter(n => n.toLowerCase().includes('video')));
  })
  .catch(console.error);
