const async = require('async');
const Project = require('../models/Project');

/**
 * GET /developer
 * Developer page.
 */
exports.index = (req, res) => {
  // TODO: Limit this, and make a load more func
  Project.find({}, null, {sort: { createdAt: 1 }}, (err, projects) => { // TOOD: Where not already assigned to a developer?
    if (err) {
      req.flash('errors', err);
      res.redirect('/');
    } else {
      res.render('developer/index', {
        title: 'Developer',
        projects: projects
      });
    }
  })
};

/**
 * GET /developer/myprojects
 * Developers project page
 */
exports.getOwnProjects = (req, res) => {
  Project.find({ developerId: req.user._id }, null, 
    {sort: { createdAt: 1 }}, (err, projects) => {
    if (err) {
      req.flash('errors', err);
      res.redirect('/');
    } else {
      res.render('developer/ownprojects', {
        title: 'Developer',
        projects: projects
      });
    }
  })
};

/**
 * GET /developer/project/:projectId
 * Project page.
 */
exports.getProject = (req, res) => {
  const projectId = req.params.projectId;
  Project.findById(projectId, (err, project) => {
    if (err) { 
      req.flash('errors', err);
      res.redirect('/developer');
    } else {
      res.render('developer/project', {
        title: 'Project',
        project: project
      });
    }
  });
};

/**
 * POST /developer/project/:projectId
 * Assign project to developer.
 */
exports.assignProject = (req, res) => {
  const projectId = req.params.projectId;
  async.waterfall([
    (callback) => {
      // Get project with id projectId
      Project.findById(projectId, (err, project) => {
        if (project.developerId) err = {msg: 'This projet is taken!'};
        callback(err, project);
      });
    }, 
    (project, callback) => {
      // Add currentUser to the project (Developer)
      project.developerId = req.user;
      project.save((err) => {
        callback(err, project);
      });
    }
  ], 
  (err, project) => {
    if (err) {
      req.flash('errors', err);
      res.redirect('/developer/project/'+projectId)
    } else {
      res.render('developer/project', {
        title: 'Project',
        project: project
      });
    }
  });
};