var fse = require("fs-extra");
var zip = require("adm-zip");
var execSync = require('child_process').execSync;

var serviceParentVer = process.env.npm_package_config_serviceparent;
var deepsdkver = process.env.npm_package_config_deepsdk;
var gameDescriptorPluginVer = process.env.npm_package_config_gamedescriptorplugin;
var verifyPluginVer = process.env.npm_package_config_verifyplugin;

console.log("Installing...");

console.log("Service-Parent" + serviceParentVer);
execSync("mvn install:install-file -DgroupId=deepmarkit.parents -DartifactId=service-parent -Dpackaging=pom -Dversion="+serviceParentVer+" -Dfile=resources/dependencies/service-parent-"+serviceParentVer+".pom",{ stdio:"inherit" });

console.log("DeepSDK " + deepsdkver);
execSync("mvn install:install-file -DgroupId=deepmarkit.games.html5.libraries -DartifactId=deepsdk -Dpackaging=min.js -Dversion="+deepsdkver+" -Dfile=resources/dependencies/deepsdk-"+deepsdkver+".min.js",{ stdio:"inherit" });

execSync("mvn install:install-file -DgroupId=deepmarkit.games.html5.libraries -DartifactId=deepsdk -Dpackaging=d.ts -Dversion="+deepsdkver+" -Dfile=resources/dependencies/deepsdk-"+deepsdkver+".d.ts",{ stdio:"inherit" });

console.log("GameDescriptorPlugin" + gameDescriptorPluginVer);
execSync("mvn install:install-file -DgroupId=deepmarkit.plugins -DartifactId=gamedescriptor-plugin -Dpackaging=jar -Dversion="+gameDescriptorPluginVer+" -Dfile=resources/dependencies/gamedescriptor-plugin-"+gameDescriptorPluginVer+".jar",{ stdio:"inherit" });

execSync("mvn install:install-file -DgroupId=deepmarkit.plugins -DartifactId=gamedescriptor-plugin -Dpackaging=pom -Dversion="+gameDescriptorPluginVer+" -Dfile=resources/dependencies/gamedescriptor-plugin-"+gameDescriptorPluginVer+".pom",{ stdio:"inherit" });

console.log("VerifyPlugin" + verifyPluginVer);
execSync("mvn install:install-file -DgroupId=deepmarkit.plugins -DartifactId=verify-plugin -Dpackaging=jar -Dversion="+verifyPluginVer+" -Dfile=resources/dependencies/verify-plugin-"+verifyPluginVer+".jar",{ stdio:"inherit" });

execSync("mvn install:install-file -DgroupId=deepmarkit.plugins -DartifactId=verify-plugin -Dpackaging=pom -Dversion="+verifyPluginVer+" -Dfile=resources/dependencies/verify-plugin-"+verifyPluginVer+".pom",{ stdio:"inherit" });
