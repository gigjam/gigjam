const Idea = require('../models/Idea');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

/**
 * GET /
 * Home page.
 */
exports.estimate = (req, res) => {
  res.render('ideas/estimate', {
    title: 'Estimate'
  });
};


/**
 * POST /
 * Create idea page.
 */
exports.createIdea = (req, res) => {
  req.assert('title',       'Title cannot be blank').notEmpty();
  req.assert('description', 'Description cannot be blank').notEmpty();
  req.assert('customer',    'Customer cannot be blank').notEmpty();
  req.assert('contact',     'Contact cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/estimate');
  }

  const idea = Idea({
    creator: req.user || null,
    title: req.body.title,
    description: req.body.description,
    customer: req.body.customer,
    contact: req.body.contact
  }); // TODO: Add more here, we got more fields in the form right now...

  idea.save((err) => {
    if (err) {
      req.flash('errors', err);
    } else {
      req.flash('success', {msg: "Successfully submitted the idea"});
    }
    return res.redirect('/estimate');
  })
};
