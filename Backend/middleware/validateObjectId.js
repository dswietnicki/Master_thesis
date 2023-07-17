const mongoose = require('mongoose');

//check is objectId is valid mongoDB ID
module.exports = function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid ID.');
  
  next();
}