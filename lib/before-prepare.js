var validator = require('./validator');

module.exports = function ($logger, $projectData, $usbLiveSyncService) {
	return validator.validate($logger, $projectData.projectDir);
}
