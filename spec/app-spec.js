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
  })
})

