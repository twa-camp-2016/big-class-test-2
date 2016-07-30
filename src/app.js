'use strict';

function getBarcodes(tags){

  return tags.map(function(item){
    let info = item.split('-');
    
    return {
      barcode: info[0],
      count: parseInt(info[1]) || 1
    }
  });
}

module.exports = {
  getBarcodes:getBarcodes
}