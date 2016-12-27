
/**
 * GET /
 * Developer page.
 */
exports.index = (req, res) => {
  res.render('developer/index', {
    title: 'Developer'
  });
};