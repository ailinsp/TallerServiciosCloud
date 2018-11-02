const express = require('express'); // call express
const app = express(); // define our app using express
const router = express.Router();
const port = process.env.PORT || 8080; // set our port

router.get('/', (req, res) => 
{
  res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);