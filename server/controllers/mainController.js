/**
 * GET /
 * Homepage 
*/
exports.homepage = async (req, res) => {
  const locals = {
    title: "NodeJs Notes",
    description: "Free NodeJS PaintBrush App.",
  }
  res.render('index', {
    locals,
    layout: '../views/layouts/front-page'
  });
}


/**
 * GET /
 * About 
*/
exports.about = async (req, res) => {
  const locals = {
    title: "About - NodeJs Notes",
    description: "Paint Brush App made using Node js.",
  }
  res.render('about', locals);
}