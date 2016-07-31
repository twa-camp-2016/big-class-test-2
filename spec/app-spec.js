"use strict";
let callFunction = require('../src/app');
let load = require('./fixture');

describe("printReceipt", function(){
  it("to print the result", function(){
    let inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];

    let expected = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`.trim();

    expect(callFunction.printReceipt(inputs)).toEqual(expected);
  });
});

describe("getBarcodes", function () {
  it("to get barcode and count", function () {
    let inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005'
    ];

    let expected = [{
      barcode: 'ITEM000001',
      count: 1
    }, {
      barcode: 'ITEM000001',
      count: 1
    }, {
      barcode: 'ITEM000003',
      count: 2
    }, {
      barcode: 'ITEM000005',
      count: 1
    }];

    expect(callFunction.getBarcodes(inputs)).toEqual(expected);
  });
});

describe("mergeBarcodes", function () {
  it("to merge barcodes", function () {
    let inputs = [{
      barcode: 'ITEM000001',
      count: 1
    }, {
      barcode: 'ITEM000001',
      count: 1
    }, {
      barcode: 'ITEM000003',
      count: 2
    }, {
      barcode: 'ITEM000005',
      count: 1
    }];

    let expected = [{
      barcode: 'ITEM000001',
      count: 2
    }, {
      barcode: 'ITEM000003',
      count: 2
    }, {
      barcode: 'ITEM000005',
      count: 1
    }]

    expect(callFunction.mergeBarcodes(inputs)).toEqual(expected);
  });
});

describe("getCartItems", function () {
  it("to get cartItems", function () {
    let inputs = [{
      barcode: 'ITEM000000',
      count: 2
    }]

    let expected = [{
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00,
      count: 2
    }]

    let allItems = load.loadAllItems();
    expect(callFunction.getCartItems(inputs, allItems)).toEqual(expected);
  });
});

describe("getPromotionType", function () {
  it("to get promotion type", function () {
    let inputs = [{
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00,
      count: 2
    }]

    let expected = [{
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00,
      count: 2,
      type: 'BUY_TWO_GET_ONE_FREE'
    }];

    let promotions = load.loadPromotions();

    expect(callFunction.getPromotionType(inputs, promotions)).toEqual(expected);
  });
});

describe("getSubtotal", function () {
  it("to get subtotal", function () {
    let inputs = [{
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00,
      count: 2,
      type: 'BUY_TWO_GET_ONE_FREE'
    }]

    let expected = [{
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00,
      count: 2,
      type: 'BUY_TWO_GET_ONE_FREE',
      subtotal: 6
    }]

    expect(callFunction.getSubtotal(inputs)).toEqual(expected);
  });
});

describe("getSavedSubtotal", function () {
  it("to get saved subtotal", function () {
    let inputs = [{
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00,
      count: 5,
      type: 'BUY_TWO_GET_ONE_FREE',
      subtotal: 15
    }]

    let expected = [{
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00,
      count: 5,
      type: 'BUY_TWO_GET_ONE_FREE',
      subtotal: 15,
      afterSavedSubtotal: 12
    }]

    expect(callFunction.getSavedSubtotal(inputs)).toEqual(expected);
  });
});

describe("gteTotal", function () {
  it("to get total", function () {
    let inputs = [{
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00,
      count: 5,
      type: 'BUY_TWO_GET_ONE_FREE',
      subtotal: 15,
      afterSavedSubtotal: 12
    }]

    let total = 12;

    expect(callFunction.getTotal(inputs)).toBe(total);
  });
});

describe("print", function () {
  it("to print the result", function () {
    let inputs = [{
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00,
      count: 5,
      type: 'BUY_TWO_GET_ONE_FREE',
      subtotal: 15,
      afterSavedSubtotal: 12
    }]

    let total = 12;
    let result = `***<没钱赚商店>收据***
名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：12.00(元)
----------------------
总计：12.00(元)
节省：3.00(元)
**********************`.trim();

    expect(callFunction.print(inputs, total)).toEqual(result);
  });
});