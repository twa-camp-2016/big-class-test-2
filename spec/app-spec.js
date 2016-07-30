'use strict';

const core = require('../src/app');

describe('formatTags', () => {
  it('should return formattedTags', () => {
    let tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000003-2.5',
      'ITEM000005',
    ];
    let expected = [{
      barcode: 'ITEM000001', amount: 1
    }, {
      barcode: 'ITEM000001', amount: 1
    }, {
      barcode: 'ITEM000003', amount: 2
    }, {
      barcode: 'ITEM000003', amount: 2.5
    }, {
      barcode: 'ITEM000005', amount: 1
    }];
    let actual = core.formatTags(tags);
    expect(actual).toEqual(expected);
  })
});


describe('mergeBarcode', () => {
  it('should return merged barcode amount list', () => {
    let formattedTags = [{
      barcode: 'ITEM000001', amount: 1
    }, {
      barcode: 'ITEM000001', amount: 1
    }, {
      barcode: 'ITEM000003', amount: 2
    }, {
      barcode: 'ITEM000003', amount: 2.5
    }, {
      barcode: 'ITEM000005', amount: 1
    }];
    let mergedBarcodes = [{
      barcode: 'ITEM000001', amount: 2
    }, {
      barcode: 'ITEM000003', amount: 4.5
    }, {
      barcode: 'ITEM000005', amount: 1
    }];
    let actual = core.mergeTags(formattedTags);
    expect(actual).toEqual(mergedBarcodes);
  })
})