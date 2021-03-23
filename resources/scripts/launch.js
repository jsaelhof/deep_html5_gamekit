var fse = require("fs-extra");
var zip = require("adm-zip");
var opn = require('opn');

if (process.argv.length > 2) {
  var gameId = process.argv[2].toLowerCase();
  // FIXME: Error if not all letters
} else {
  console.log("ERROR: No gameId value found");
  console.log("Usage: npm run launch <game id> <skin id>");
  return;
}

if (process.argv.length > 3) {
  var skinId = process.argv[3].toLowerCase();
  // FIXME: Error if not all letters
} else {
  console.log("ERROR: No skinId value found");
  console.log("Usage: npm run launch <game id> <skin id>");
  return;
}

opn('http://localhost:8080/' + gameId + '/core/index.html?gameId='+gameId+'&skinId='+skinId+'&demo=leaderboard');
