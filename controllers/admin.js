const Invite = require('../models/Invite');
const Application = require('../models/Application');

/**
 * GET /admin
 * Admin page.
 */
exports.index = (req, res) => {
  res.render('admin/index', {
    title: 'Admin'
  });
};

/**
 * GET /admin/invite
 * Invite page.
 */
exports.invite = (req, res) => {
  Invite.find({}, (err, invitations) => {
    if (err) {
        req.flash('errors', err);
    }
    return res.render('admin/invite', { 
        title: 'Invite',
        invitations: invitations,
        host: req.headers.host
    });
  });
};

/**
 * Post /admin/invite
 * Invite page.
 */
exports.createInvite = (req, res) => {
  
  var invite = Invite ({ 
    type: 'Developer'
  });

  invite.save((err) => {
      if (err) { return done(err); };
      req.flash('success', { msg: 'Invitation created' });
      return res.redirect('/admin/invite');
  });
}

/**
 * Post /admin/invite
 * Invite page.
 */
exports.createSellerInvite = (req, res) => {
  
  var invite = Invite ({
    type: 'Seller'
  });

  invite.save((err) => {
      if (err) { return done(err); };
      req.flash('success', { msg: 'Invitation created' });
      return res.redirect('/admin/invite');
  });
}

/**
 * POST /admin/invite/delete/5
 * Admin invite delete.
 */
exports.deleteInvite = (req, res) => {
    const inviteId = req.params.inviteId;

    Invite.findById(inviteId).remove((err) => {
        if (err) {
            req.flash('errors', err);
            return res.redirect('/admin/invite');
        } else {
            req.flash('success', { msg: 'Successfully deleted invite' });
            return res.redirect('/admin/invite');
        }
    });
};

/**
 * GET /admin/applications
 * Applications page.
 */
exports.applications = (req, res) => {
  Application.find({}, (err, applications) => {
    if (err) {
        req.flash('errors', err);
    }
    return res.render('admin/applications', { 
        title: 'Applications',
        applications: applications
    });
  });
};

/**
 * GET /admin/application/accept/5
 * Application accept.
 */
exports.acceptApplication = (req, res) => {
  // TODO: Update creator of application to what they applied for.
    const applicationId = req.params.applicationId;

    Application.findById(applicationId).remove((err) => {
        if (err) {
            req.flash('errors', err);
            return res.redirect('/admin/applications');
        } else {
            req.flash('success', { msg: 'Successfully deleted application' });
            return res.redirect('/admin/applications');
        }
    });
};



/**
 * POST /admin/application/delete/5
 * Admin application delete.
 */
exports.deleteApplication = (req, res) => {
    const applicationId = req.params.applicationId;

    Application.findById(applicationId).remove((err) => {
        if (err) {
            req.flash('errors', err);
            return res.redirect('/admin/applications');
        } else {
            req.flash('success', { msg: 'Successfully deleted application' });
            return res.redirect('/admin/applications');
        }
    });
}