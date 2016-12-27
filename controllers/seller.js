
/**
 * GET /
 * Admin page.
 */
exports.index = (req, res) => {
  res.render('seller/index', {
    title: 'Admin'
  });
};