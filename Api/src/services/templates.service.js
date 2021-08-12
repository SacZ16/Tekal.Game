// const {getAssets} = require('./csv.service.js');

// const videosURL = getAssets().then(res => res);//videos que sacamos del csv
// // Selecciona un template al azar

// console.log(videosURL);

// var random = Math.round(Math.random() * 999)
// const template = require(`../assets/level_templates/template_${random}.json`)[2];

const template = require('../assets/level_templates/prueba.json');
const templateFill = template[2];

const vig = templateFill.filter(e => e[1] === 'vig')
const numberOfVigs = vig.length;

function templateFiller(arrayAssets) {
  let assetsToSee = [];

  let arrAssets = arrayAssets.map((e, i) => { return { url: e, id: i + 1 } });

  templateFill.forEach((e, i) => {
    let assetId = arrAssets.filter(b => b.id === e[0]);
    assetsToSee.push(assetId);
    assetsToSee[i].push(e[1]);
  });

  let target = [numberOfVigs];
  target.unshift(template[0]);
  target.push(assetsToSee);
  // assetsToSee.unshift(target);

  return target;
}




module.exports = { templateFiller };