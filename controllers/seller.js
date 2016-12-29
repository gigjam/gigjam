const async = require('async');
const Idea = require('../models/Idea');
const Project = require('../models/Project');

/**
 * GET /
 * Seller page.
 */
exports.index = (req, res) => {
  // TODO: Limit this, and make a load more func
  Idea.find({}, null, {sort: { createdAt: 1 }}, (err, ideas) => {
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


/**
 * GET /
 * Idea create project page.
 */
exports.getCreateProject = (req, res) => {
  const ideaId = req.params.ideaId;
  Idea.findById(ideaId, (err, idea) => {
    if (err) {
      req.flash('errors', err);
      res.redirect('/');
    } else {
      res.render('seller/createproject', {
        title: 'Idea',
        idea: idea
      });
    }
  })
};

/**
 * POST /
 * Idea create project page.
 */
exports.postCreateProject = (req, res) => {
 // TODO: Limit chars on title..
  req.assert('title',       'Title cannot be blank').notEmpty();
  req.assert('description', 'Description cannot be blank').notEmpty();
  req.assert('customer',    'Customer cannot be blank').notEmpty();
  req.assert('contact',     'Contact cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/seller');
  }

  const ideaId = req.params.ideaId;

  async.waterfall([
    (callback) => {
      const project = Project({
        creator: req.user || null,
        title: req.body.title,
        description: req.body.description,
        customer: req.body.customer,
        contact: req.body.contact
      }); // TODO: Add more here, we got more fields in the form right now...

      project.save((err) => {
        callback(err);
      })
    },
    (callback) => {
      Idea.remove({ _id: ideaId }, (err) => {
        callback(err);
      });
    }
  ], 
  (err, result) => {
    if (err) {
      req.flash('errors', err);
    } else {
      req.flash('success', {msg: "Successfully created the project"});
    }
    return res.redirect('/seller');
  });
};