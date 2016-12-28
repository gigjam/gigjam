const Project = require('../models/Project');

/**
 * GET /
 * Developer page.
 */
exports.index = (req, res) => {
  // TODO: Limit this, and make a load more func
  // TODO: Sort this.
  Project.find({}, (err, projects) => {
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
 * GET /
 * Project page.
 */
exports.getProject = (req, res) => {
  const projectId = req.params.projectId;
  Project.findById(projectId, (err, project) => {
    if (err) { 
      res.flash('errors', err);
      res.redirect('/developer');
    } else {
      res.render('developer/project', {
        title: 'Project',
        project: project
      });
    }
  });
};