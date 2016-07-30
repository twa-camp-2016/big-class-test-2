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
  for (let i = 0; i < subTotalItems.length; i++) {
    let flag = false;
    let type = "";
    for (let j = 0; j < promotions.length; j++) {
      for (let z = 0; z < promotions[j].barcodes.length; z++) {
        if (subTotalItems[i].barcode === promotions[j].barcodes[z]) {
          flag = true;
          type = promotions[j].type;
        }
      }
    }
    if (!flag) {
      type = null;
    }
    promtionsTypeItems.push(Object.assign({}, subTotalItems[i], {type: type}));
  }
  return promtionsTypeItems;
}

function getPromotionsSubTotalItems(promtionsTypeItems) {
  let getPromotionSubTotalItems = [];
  for (let i = 0; i < promtionsTypeItems.length; i++) {
    if (promtionsTypeItems[i].type = 'BUY_TWO_GET_ONE_FREE') {
      let PromotionsSubTotal = promtionsTypeItems[i].subTotal - parseInt(promtionsTypeItems[i].amount / 3) * promtionsTypeItems[i].price;
      getPromotionSubTotalItems.push(Object.assign({}, promtionsTypeItems[i], {PromotionsSubTotal: PromotionsSubTotal}));
    }
    else
      getPromotionSubTotalItems.push(Object.assign({}, promtionsTypeItems[i], {PromotionsSubTotal: promtionsTypeItems[i].subTotal}));
  }
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