const Idea = require('../models/Idea');

/**
 * GET /
 * Admin page.
 */
exports.index = (req, res) => {
  Idea.find({}, (err, ideas) => {
    if (err) {
      req.flash('errors', err);
      res.redirect('/');
    } else {
      res.render('seller/index', {
        title: 'Admin',
        ideas: ideas
      });
    }
  })
};