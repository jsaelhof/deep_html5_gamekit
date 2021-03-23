var fse = require("fs-extra");
var zip = require("adm-zip");
var execSync = require('child_process').execSync;

if (process.argv.length > 2) {
  var command = process.argv[2].toLowerCase();
} else {
  console.log("ERROR: No command found");
  console.log("Usage: npm run server [deploy|start|stop]");
  return;
}

var isWindows = /^win/.test(process.platform);

if (command === "deploy") {
  if (!fse.existsSync("tomcat")) {
    var tomcatZip = new zip("resources/apps/tomcat.zip");
    tomcatZip.extractAllTo(".");
    if (!isWindows) {
      execSync("chmod +x *.sh",{ cwd:"tomcat/bin" }, { stdio:"inherit" });
    }
  } else {
    console.log("Server already deployed");
  }
} else if (command === "start") {
  if (isWindows) {
    execSync("startup.bat", { stdio:"inherit", cwd:"tomcat/bin/" });
  } else {
    execSync("tomcat/bin/startup.sh", { stdio:"inherit" });
  }
} else if (command === "stop") {
  if (isWindows) {
    execSync("shutdown.bat", { stdio:"inherit", cwd:"tomcat/bin/" });
  } else {
    execSync("tomcat/bin/shutdown.sh", { stdio:"inherit" });
  }
} else {
  console.log("Invalid command: '"+ command +"'");
}
