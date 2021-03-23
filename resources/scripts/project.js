var fse = require("fs-extra");
var zip = require("adm-zip");
var execSync = require('child_process').execSync;

if (process.argv.length > 2) {
  var gameId = process.argv[2].toLowerCase();
  // FIXME: Error if not all letters
} else {
  console.log("ERROR: No gameId value found.");
  console.log("Usage: npm run project <game id>");
  return;
}

if (process.argv.length > 3) {
  var skinId = process.argv[3].toLowerCase();
}

 // FIXME: Add ability to change the skin id from default to something else with another param

var projectsDir = "projects";
var projectDir = projectsDir + "/" + gameId;

if (!fse.existsSync(projectsDir)) {
  fse.mkdirpSync(projectsDir);
}

if (!fse.existsSync(projectDir)) {
  var gameTemplateZip = new zip("resources/apps/gametemplate.zip");
  gameTemplateZip.extractAllTo(projectDir);

  replaceInFile(projectDir + "/pom.xml", "@game\.id@", gameId);
  replaceInFile(projectDir + "/package.json", "@game\.id@", gameId);
  replaceInFile(projectDir + "/tsconfig.json", "@game\.id@", gameId);
  replaceInFile(projectDir + "/src/main/typescript/Main.ts", "@game\.id@", gameId);
  replaceInFile(projectDir + "/src/main/typescript/Game.ts", "@game\.id@", gameId);
  replaceInFile(projectDir + "/src/main/webapp/gamedata.json", "@game\.id@", gameId);
  replaceInFile(projectDir + "/src/main/webapp/index.html", "@game\.id@", gameId);
  replaceInFile(projectDir + "/src/main/webapp/library.json", "@game\.id@", gameId);

  replaceInFile(projectDir + "/package.json", "\"deepsdk\":(.*)", '"deepsdk": "' + process.env.npm_package_config_deepsdk + '",');

  if (skinId !== undefined) {
    replaceInFile(projectDir + "/src/main/webapp/gamedata.json", "default", skinId);

    fse.move(projectDir + "/src/main/webapp/skins/default",projectDir + "/src/main/webapp/skins/" + skinId, { overwrite:false });
  }
} else {
  console.log("Project " + gameId + " already exists");
}

function replaceInFile ( path, token, replace ) {
  var data = fse.readFileSync(path, 'utf8');
  var result = data.replace(new RegExp(token,"g"), replace);
  fse.writeFileSync(path, result, 'utf8');
}
