 var fse = require("fs-extra");
 var zip = require("adm-zip");
 var execSync = require('child_process').execSync;

 if (process.argv.length > 2) {
   var gameId = process.argv[2].toLowerCase();
   // FIXME: Error if not all letters
 } else {
   console.log("ERROR: No gameId value found");
   console.log("Usage: npm run install <game id>");
   return;
 }

 var deployDir = "tomcat/webapps";
 var deployGameDir = deployDir + "/" + gameId;
 var deployCoreDir = deployGameDir + "/core";
 var projectsDir = "projects";
 var projectDir = projectsDir + "/" + gameId;

if (!fse.existsSync(projectDir)) {
  console.log("Project " + gameId + " does not exist. Cannot deploy.");
  return;
}

if (!fse.existsSync("tomcat")) {
  console.log("Server not deployed. Use: npm run server");
  return;
}

if (!fse.existsSync(deployGameDir)) {
  fse.mkdirpSync(deployGameDir);
}

if (!fse.existsSync(deployCoreDir)) {
  var coreZip = new zip("resources/apps/core.zip");
  coreZip.extractAllTo(deployCoreDir, true);
}

execSync("mvn package", { stdio:"inherit", cwd:projectDir });

fse.removeSync(deployGameDir + "/games");
fse.mkdirpSync(deployGameDir + "/games");

var gameZipPath = projectDir + "/target/" + gameId + ".zip";
if (fse.existsSync(gameZipPath)) {
  var gameZip = new zip(gameZipPath);
  gameZip.extractAllTo(deployGameDir + "/games/" + gameId, true);
}
