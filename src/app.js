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

function mergeBarcodes(barcodes) {
  return barcodes.reduce(function (cur, newVal) {
    let exist = cur.find(function (item) {
      return item.barcode === newVal.barcode;
    });
    if (exist) {
      exist.count++;
    }
    else {
      cur.push(Object.assign({}, newVal));
    }

    return cur;
  }, []);
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

function getPromotionType(cartItems, promotions) {
  return cartItems.map(function (item) {
    for (let pro of promotions) {
      let exist = pro.barcodes.find(function (barcode) {
        return barcode === item.barcode;
      });

      if (exist) {
        return Object.assign({}, item, {type: pro.type});
      }
    }
  });
}

function getSubtotal(promotionTypedCartItems) {
  return promotionTypedCartItems.map(function (item) {
    return Object.assign({}, item, {subtotal: item.price * item.count});
  });
}

function getSavedSubtotal(subtotalCartItems) {
  return subtotalCartItems.map(function (item) {
    let money = (item.count - parseInt(item.count / 3)) * item.price;
    return Object.assign({}, item, {afterSavedSubtotal: money});
  });
}

function getTotal(afterSavedItems) {
  let total = 0;

  for (let item of afterSavedItems) {
    total += item.afterSavedSubtotal;
  }

  return total;
}


function Print(afterSavedItems, total) {
  let receiptString = "***<没钱赚商店>收据***\n";
  let savedTotal = 0;

  for (let item of afterSavedItems) {
    receiptString += "名称：" + item.name + "，数量：" + item.count + item.unit +
            "，单价：" + item.price.toFixed(2) + "(元)，小计：" + item.afterSavedSubtotal.toFixed(2) + "(元)\n";
    savedTotal += item.subtotal - item.afterSavedSubtotal;
  }
  receiptString += "----------------------\n";
  receiptString += "总计：" + total.toFixed(2) + "(元)\n";
  receiptString += "节省：" + savedTotal.toFixed(2) + "(元)\n";
  receiptString += "**********************";
  return receiptString;

}
module.exports = {
  getBarcodes: getBarcodes,
  mergeBarcodes: mergeBarcodes,
  getCartItems: getCartItems,
  getPromotionType: getPromotionType,
  getSubtotal: getSubtotal,
  getSavedSubtotal: getSavedSubtotal,
  getTotal: getTotal,
  Print: Print
}