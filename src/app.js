"use strict";
import {
  loadAllItems,
  loadPromotions
} from "../spec/fixture";

function formatTag(tag) {
  return tag.map(item=> {
    let div = item.split("-");
    return {
      barcode: div[0],
      amount: Number(div[1]) || 1
    };
  });
}

function mergeTag(tags) {
  let mergedTags = [];
  tags.forEach(item=> {
    let existItem = mergedTags.find(it=> {
      return it.barcode === item.barcode;
    });
    if (existItem) {
      existItem.amount += item.amount;
    }
    else {
      mergedTags.push({barcode: item.barcode, amount: item.amount});
    }
  });
  return mergedTags;
}

function getCartItems(items, mergedItems) {
  let cartItems = [];
  mergedItems.forEach(item=> {
    let exist = items.find(it=> {
      return it.barcode === item.barcode;
    });
    cartItems.push(Object.assign({}, exist, item));
  });
  return cartItems;
}

function getSubTotalItems(cartItems) {
  let subTotalItems = [];
  cartItems.forEach(item=> {
    let subTotal = item.price * item.amount;
    subTotalItems.push(Object.assign({}, item, {subTotal: subTotal}));
  });
  return subTotalItems;
}

function calculateTotal(subTotalItems) {
  return subTotalItems.reduce((a, b)=> {
    return a += b.subTotal;
  }, 0);
}

function getPromotionsTypeItems(promotions, subTotalItems) {
  let promtionsTypeItems = [];
  subTotalItems.forEach(item=> {
    let flag = false;
    let type = "";
    promotions.forEach(it=> {
      let exist = it.barcodes.find(is=> {
        return item.barcode === is
      });
      if (exist) {
        flag = true;
        type = it.type;
      } else {
        type = null;
      }
    });
    promtionsTypeItems.push(Object.assign({}, item, {type: type}));
  });
  return promtionsTypeItems;
}

function getPromotionsSubTotalItems(promtionsTypeItems) {
  let getPromotionSubTotalItems = [];
  promtionsTypeItems.forEach(item=> {
    if (item.type === 'BUY_TWO_GET_ONE_FREE') {
      let PromotionsSubTotal = item.subTotal - parseInt(item.amount / 3) * item.price;
      getPromotionSubTotalItems.push(Object.assign({}, item, {PromotionsSubTotal: PromotionsSubTotal}));
    }
    else
      getPromotionSubTotalItems.push(Object.assign({}, item, {PromotionsSubTotal: item.subTotal}))
  });
  return getPromotionSubTotalItems;
}

function calculatePromotionTotal(getPromotionSubTotalItems) {
  return getPromotionSubTotalItems.reduce((a, b)=> {
    return a += b.PromotionsSubTotal
  }, 0);
}

function calculateSaving(total, promotionsTotal) {
  return total - promotionsTotal;
}

function getSummaryString(getPromotionSubTotalItems, saving, promotionsTotal) {
  let str = "***<没钱赚商店>收据***" + "\n";
  for (let i = 0; i < getPromotionSubTotalItems.length; i++) {
    str += "名称：" + getPromotionSubTotalItems[i].name + "，数量：" + getPromotionSubTotalItems[i].amount + getPromotionSubTotalItems[i].unit
      + "，单价：" + getPromotionSubTotalItems[i].price.toFixed(2) + "(元)，小计：" + getPromotionSubTotalItems[i].PromotionsSubTotal.toFixed(2) + "(元)\n"
  }
  str += "----------------------\n";
  str += "总计：" + promotionsTotal.toFixed(2) + "(元)\n";
  str += "节省：" + saving.toFixed(2) + "(元)\n";
  str += "**********************";
  return str.trim();
}

module.exports = {
  formatTag,
  mergeTag,
  getCartItems,
  loadAllItems,
  getSubTotalItems,
  calculateTotal,
  loadPromotions,
  getPromotionsTypeItems,
  getPromotionsSubTotalItems,
  calculatePromotionTotal,
  calculateSaving,
  getSummaryString
};