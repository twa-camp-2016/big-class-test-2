'use strict';
var callFunction = require('../src/app');

describe("getBarcodes", function(){
  it("to get barcode and count", function(){
    let inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005'
    ];
    
    let expected = [{
      barcode:'ITEM000001',
      count: 1
    },{
      barcode:'ITEM000001',
      count: 1
    },{
      barcode:'ITEM000003',
      count: 2
    },{
      barcode:'ITEM000005',
      count: 1
    }];
    
    expect(callFunction.getBarcodes(inputs)).toEqual(expected);
  })
})
