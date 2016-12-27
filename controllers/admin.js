
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
 * GET /
 * Invite page.
 */
exports.invite = (req, res) => {
  res.render('admin/invite', {
    title: 'Invite'
  });
};
