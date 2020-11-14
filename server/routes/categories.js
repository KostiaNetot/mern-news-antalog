const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/').get((req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json(`Error: ${err}`));
});


router.route('/add').post((req, res) => {
  const name = req.body.name;
  // const newsList = req.body.newsList;
  const newCategory = new Category({ name });

  newCategory.save()
    .then(() => res.json('Category added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/upd/:id').put((req, res) => {
  const { id } = req.params;

  Category.findByIdAndUpdate(id, req.body, { new: true })
    .then(doc => {
      if (doc) {
        res.json(doc)
      }
    })
    .catch(err => console.log(err));
});

router.route('/:id').delete((req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.json('Category deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
