const Idea = require('../models/Idea');
const Application = require('../models/Application');
const async = require('async');
const slack = require('../tools/slack');

var SlackBot = require('slackbots');

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
  // TODO: Limit chars on title..
  req.assert('title',       'Title cannot be blank').notEmpty();
  req.assert('description', 'Description cannot be blank').notEmpty();
  req.assert('customer',    'Customer cannot be blank').notEmpty();
  req.assert('contact',     'Contact cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/estimate');
  }

  async.waterfall([
    (callback) => {

      const idea = Idea({
        creator: req.user || null,
        title: req.body.title,
        description: req.body.description,
        customer: req.body.customer,
        contact: req.body.contact,
        projectType: req.body.project_type,
        skills: req.body.skills,
        type: req.body.type,
        lookingFor: req.body.looking_for,
        hours: req.body.hours,
        estimate: req.body.estimate
      });

      idea.save((err) => {
        callback(err, idea);
      })
    }, 
    (idea, callback) => {
      var message = 'En ny estimering har skapats! ' + req.protocol + '://' + req.headers.host + '/seller/idea/' + idea._id;
      slack.notifyEstimate(message);
      callback(null);
    }
  ], (err, result) => {
      if (err) {
        req.flash('errors', err);
      } else {
        req.flash('success', {msg: "Successfully submitted the idea"});
      }
      return res.redirect('/estimate');
  });

};

/**
 * GET /join/developer
 * Join developer page.
 */
exports.joinDeveloper = (req, res) => {
  res.render('application/developer', {
    title: 'Join',  // Required for heighliht
  });
};

/**
 * POST /join/developer
 * Join developer page.
 */
exports.postJoinDeveloper = (req, res) => {
  if (req.user.isDeveloper) {
    req.flash('errors', {msg: 'You are aleady a developer!'});
    return res.redirect('/');
  }
  const application = Application({
    _creator: req.user,
    type: 'Developer',
    message: req.body.message || ''
  });

  application.save((err) => {
    if (err) {
      req.flash('errors', err);
      res.redirect('/join/developer');
    } else {
      req.flash('success', {msg: 'Your application has been recived!'})
      res.redirect('/');
    }
  });
};

/**
 * GET /join/seller
 * Join seller page.
 */
exports.joinSeller = (req, res) => {
  res.render('application/seller', {
    title: 'Join', // Required for heighliht
  });
};

/**
 * POST /join/seller
 * Join seller page.
 */
exports.postJoinSeller = (req, res) => {
  if (req.user.isSeller) {
    req.flash('errors', {msg: 'You are aleady a seller!'});
    return res.redirect('/');
  }
  const application = Application({
    _creator: req.user,
    type: 'Seller',
    message: req.body.message || ''
  });

  application.save((err) => {
    if (err) {
      req.flash('errors', err);
      res.redirect('/join/seller');
    } else {
      req.flash('success', {msg: 'Your application has been recived!'})
      res.redirect('/');
    }
  });
};

