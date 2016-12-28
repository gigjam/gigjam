const Idea = require('../models/Idea');

/**
 * GET /
 * Seller page.
 */
exports.index = (req, res) => {
  // TODO: Limit this, and make a load more func
  Idea.find({}, (err, ideas) => {
    if (err) {
      req.flash('errors', err);
      res.redirect('/');
    } else {
      res.render('seller/index', {
        title: 'Ideas',
        ideas: ideas
      });
    }
  })
};

/**
 * GET /
 * Idea single page.
 */
exports.getIdea = (req, res) => {
  const ideaId = req.params.ideaId;
  Idea.findById(ideaId, (err, idea) => {
    if (err) {
      req.flash('errors', err);
      res.redirect('/');
    } else {
      res.render('seller/idea', {
        title: 'Idea',
        idea: idea
      });
    }
  })
};