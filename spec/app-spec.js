'use strict';
const fixture = require('./fixture');
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

describe('getCartItems', () => {
  it('should return cartItem information list', () => {

    let mergedBarcodes = [{
      barcode: 'ITEM000001', amount: 2
    }, {
      barcode: 'ITEM000003', amount: 4.5
    }, {
      barcode: 'ITEM000005', amount: 1
    }];
    let cartItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 2
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 4.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 1
      }

    ];
    let actual = core.getCartItems(mergedBarcodes, fixture.loadAllItems());
    expect(actual).toEqual(cartItems);
  })
})

fdescribe('getBuyTwoFreeOneItems', () => {
  it('should return cartItem information list of buy two free one item', () => {
    let cartItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 2
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 4.5
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 1
      }

    ];

    let buyTwoFreeOneItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 2
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 1
      }
    ];

    let actual = core.getBuyTwoFreeOneItems(cartItems, fixture.loadPromotions());
    expect(actual).toEqual(buyTwoFreeOneItems);
  })
})


