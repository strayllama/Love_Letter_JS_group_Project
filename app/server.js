const express = require('express');
const parser = require('body-parser');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${ __dirname }/client/public/index.html`);
});

app.listen(3000, function () {
  console.log(`Example app listening on port ${ this.address().port }`);
});
