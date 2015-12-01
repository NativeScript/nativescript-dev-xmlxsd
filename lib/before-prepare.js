var validator = require('./validator');

module.exports = function ($logger, $projectData, $usbLiveSyncService) {
	if (!$usbLiveSyncService.isInitialized) {
		return validator.validate($logger, $projectData.projectDir);
	}
}
