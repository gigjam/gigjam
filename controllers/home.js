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

