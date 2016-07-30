'use strict';

function getBarcodes(tags) {

  return tags.map(function (item) {
    let info = item.split('-');

    return {
      barcode: info[0],
      count: parseInt(info[1]) || 1
    }
  });
}

function getCartItems(mergedBarcodes, allItems) {
  return mergedBarcodes.map(function (item) {
    let exist = allItems.find(function (info) {
      return info.barcode === item.barcode;
    });

    if (exist) {
      return Object.assign({}, exist, {count: item.count});
    }
  });
}

module.exports = {
  getBarcodes: getBarcodes,
  getCartItems: getCartItems,
}