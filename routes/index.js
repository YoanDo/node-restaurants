const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const yo = { name: "yo", age: 100, cool: true }
  // console.log("Yo!")
  // res.send('Hey! It works!');
  // res.json(yo);
  res.render('hello', {
    name: "Yo",
    dog: req.query.dog,
    title: 'I love dogs'
  });
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse)
})
module.exports = router;
