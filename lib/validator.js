exports.validate = validate;

var fs = require('fs');
var path = require('path');
var libxmljs = require('libxmljs');
var glob = require('glob');

function validate(logger, projectDir, options) {
	return new Promise(function (resolve, reject) {
		options = options || {};

		var peerPath = path.join(__dirname, '../../tns-core-modules-xsd-schema');
		var xsdPath = path.join(peerPath, 'tns.xsd');
		if (fs.existsSync(xsdPath)) {
			try {
				logger.info('Found peer NativeScript XSD schema ' + require(path.join(peerPath, 'package.json')).version);
			} catch (err) { }
		} else {
			throw Error('NativeScript XSD schema installation local to project was not found. Install by executing `npm install tns-core-modules-xsd-schema`.');
		}
		
		var xsdFileContent = fs.readFileSync(xsdPath, { encoding: 'utf8'});
		var xsdDocument = libxmljs.parseXml(xsdFileContent);
		
		var xmlFilesPath = path.join(projectDir, 'app/**/*.xml');
		var xmlFiles = glob.sync(xmlFilesPath).filter(function(fileName){
			return fileName.indexOf("App_Resources") === -1;
		});
	
		for(var i = 0; i < xmlFiles.length; i++) {
		    var filePath = xmlFiles[i];
			var xmlFileContent = fs.readFileSync(filePath, { encoding: 'utf8'});
			var xmlDocument = libxmljs.parseXml(xmlFileContent);
			
			if(!xmlDocument.validate(xsdDocument)){
				reject(Error(filePath + ' XSD validation failed. Validation errors: ' + xmlDocument.validationErrors));
			}
		}
		
		resolve();
	});
}