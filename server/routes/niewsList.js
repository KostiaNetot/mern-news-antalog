const router = require('express').Router();
let News = require('../models/news.model');

router.route('/').get((req, res) => {
  News.find()
    .then(allNews => res.json(allNews))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  News.findById(req.params.id)
    .then(news => res.json(news))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const reporter = req.body.reporter;
  const date = req.body.date;
  const categories = req.body.categories;
  const text = req.body.text;

  const newNews = new News({
    title,
    reporter,
    date,
    categories,
    text,
  });

  newNews.save()
    .then(() => res.json('New news added!'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/upd/:id').put((req, res) => {
  const { id } = req.params;

  News.findByIdAndUpdate(id, req.body, { new: true })
    .then(doc => {
      if (doc) {
        res.json(doc)
      }
    })
    .catch(err => console.log(err));
});

router.route('/:id').delete((req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.json('Category deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
