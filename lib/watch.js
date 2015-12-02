var validator = require('./validator');

module.exports = function ($logger, $projectData, $errors) {
	validator.validate($logger, $projectData.projectDir);
}
