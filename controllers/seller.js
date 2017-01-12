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
  const ideaId = req.params.ideaId;

  async.waterfall([
    (callback) => { 
      Idea.findById(ideaId, (err, idea) => {
        callback(err, idea);
      });
    },
    (idea, callback) => {
      const project = Project({
        creator: idea.user || null,
        title: idea.title,
        description: idea.description,
        customer: idea.customer,
        contact: idea.contact,
        projectType: idea.project_type,
        skills: idea.skills,
        type: idea.type,
        lookingFor: idea.looking_for,
        hours: idea.hours,
        estimate: idea.estimate
      });

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