const slack = require('../tools/slack');

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }
  var message = 'Namn: ' + req.body.name + ' Email: ' + req.body.email + ' Meddelande: ' + req.body.message;
  slack.contactSend(message)
  req.flash('success', { msg: 'Meddelandet har skickats!' });
  res.redirect('/contact');
};
