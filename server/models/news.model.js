const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: { type: String, required: true },
  reporter: { type: String, required: true },
  date: { type: Date, required: true },
  categories: { type: Array },
  text: { type: String, required: true },
}, {
  timestamps: true,
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
