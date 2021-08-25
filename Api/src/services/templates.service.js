const picker = require('../services/templatePicker.service');

function templateFiller(template, arrayAssets){
  let assetsToSee = [];

  let arrAssets = arrayAssets.map((e,i) => { return { url:e, id: i }  });//[{url,id}{url,id}]

  const templateFiller = template[3];
  templateFiller.forEach((e,i) => {
    let assetId = arrAssets.filter(b => b.id === e[0]);//[{url,id},{},{}] ordenados como en el template
    assetsToSee.push(assetId); //[[{},{}]]
    assetsToSee[i].push(e[1]);
  });
  let array = [];
  array.push(template[1]);
  array.push(template[0]);
  array.push(assetsToSee);
  return array;
}

function templateFillerLongTerm(template, arrayTarget, arrayNoTarget){
  let assetsToSee = [];

  let arrAssetsTarget = arrayTarget.map((e,i) => { return { url:e, id: i }  });//[{url,id}{url,id}]
  let cant = arrAssetsTarget.length;
  let arrAssetsNoTarget = arrayNoTarget.map((e, i) => { return { url:e, id: i+cant }  });//[{url,id}{url,id}]
  let arrayConjunto = arrAssetsTarget.concat(arrAssetsNoTarget);
  const templateFiller = template[3];

  templateFiller.forEach((e,i) => {
    let assetTarget= arrayConjunto.filter(b => b.id === e[0]);//[{url,id},{},{}] ordenados como en el template
    assetsToSee.push(assetTarget); //[[{},{}]]
    assetsToSee[i].push(e[1]);
  });
  let array = [];
  array.push(template[1]);
  array.push(template[0]);
  array.push(assetsToSee);
  return array;
}

module.exports = {templateFiller, templateFillerLongTerm};
