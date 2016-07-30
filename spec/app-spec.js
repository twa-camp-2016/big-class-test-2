'use strict';
let callFunction = require('../src/app');
let load = require('./fixture');

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

describe("getPromotions", function () {
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
    }]

    let promotions = load.loadPromotions();

    expect(callFunction.getPromotions(inputs, promotions)).toEqual(expected);
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

