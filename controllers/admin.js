const Invite = require('../models/Invite');

/**
 * GET /
 * Admin page.
 */
exports.index = (req, res) => {
  res.render('admin/index', {
    title: 'Admin'
  });
};

/**
 * GET /invite
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
 * Post /invite
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
 * Post /invite
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
 * Admin invite create.
 */
exports.deleteInvite = (req, res) => {
    const inviteId = req.params.inviteId;

    Invite.findById(inviteId).remove((err, invite) => {
        if (err) {
            req.flash('errors', err);
            return res.redirect('/admin/invite');
        } else {
            req.flash('success', { msg: 'Successfully deleted invite' });
            return res.redirect('/admin/invite');
        }
    });
};