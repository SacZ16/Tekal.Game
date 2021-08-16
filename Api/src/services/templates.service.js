// var random = Math.round(Math.random() * 999) 
// const template = require(`../assets/level_templates/template_${random}.json`)[2];

const template = require('../assets/level_templates/prueba2.json');
const templateFill = template[2];
// Sacamos los videos unicos
//Math.round(Math.random * 10)
const vig = templateFill.filter(e => e[1] === 'vig')//[[..,v][..,v]]
const numberOfVigs = vig.length;

function templateFiller(arrayAssets){
  let assetsToSee = [];

  let arrAssets = arrayAssets.map((e,i) => { return { url:e, id: i+1 }  });
  //[{url,id}{url,id}]
  templateFill.forEach((e,i) => {
    let assetId = arrAssets.filter(b => b.id === e[0]);//[{url,id},{},{}] ordenados como en el template
    assetsToSee.push(assetId); //[[{},{}]]
    assetsToSee[i].push(e[1]);
  });

  let target = [numberOfVigs];
  target.unshift(template[0]);
  target.push(assetsToSee);

  return target;
}


module.exports = {templateFiller};