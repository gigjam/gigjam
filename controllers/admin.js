const async = require('async');
const nodemailer = require('nodemailer');
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
  Application.find({}).populate('_creator').exec((err, applications) => {
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
    const applicationId = req.params.applicationId;

    async.waterfall([
        (callback) => {
            Application.findById(applicationId).populate('_creator').exec((err, application) => {
                callback(err, application);
            });
        },
        (application, callback) => {
            const user = application._creator;
            if (application.type === 'Developer') {
                user.isDeveloper = true;
            } else if (application.type === 'Seller') {
                user.isSeller = true;
            } else {
               return callback({msg: 'Application is broken!'});
            }
            user.save((err) => {
                callback(err, application);
            });
        }, 
        (application, callback) => {
            const email = application._creator.email;
            const applicationType = application.type;
            application.remove((err) => {
                callback(err, email, applicationType);
            });
        }, 
        (email, applicationType, callback) => {
            sendAcceptNotification(email, applicationType, (err) => {
                callback(err);
            });
        }
    ], 
    (err) => {
        if (err) {
            req.flash('errors', err);
            return res.redirect('/admin/applications');
        } else {
            req.flash('success', { msg: 'Successfully accepted application' });
            return res.redirect('/admin/applications');
        }
    });
};

/**
 * Send email with application accepted
 */
function sendAcceptNotification(email, type, callback) {
    const transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
            user: process.env.MAILGUN_USER,
            pass: process.env.MAILGUN_PASSWORD
        }
    });
    const mailOptions = {
        to: email,
        from: 'notify@gigjam.com',
        subject: 'Your GigJam user has been upgraded to ' + type,
        text: `Hello,\n\nThis is a notification that your account ${email} has just been upgraded to ${type}`
    };
    transporter.sendMail(mailOptions, (err) => {
        callback(err);
    });
}



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