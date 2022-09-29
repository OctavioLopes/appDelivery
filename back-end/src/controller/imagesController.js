const path = require('path');

const getImage = (req, res) => {
const fileName = req.params.name;
res.sendFile(path.resolve(__dirname, `../images/${fileName}`));
};

module.exports = getImage;