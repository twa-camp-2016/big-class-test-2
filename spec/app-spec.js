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
});

fdescribe('getCartItems', () => {
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
});

describe('getBuyTwoFreeOneItems', () => {
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

    let buyTwoFreeOneItems = ['ITEM000001', 'ITEM000005'];

    let actual = core.getBuyTwoFreeOneItems(cartItems, fixture.loadPromotions());
    expect(actual).toEqual(buyTwoFreeOneItems);
  })
});

describe('calculateOriginSubTotal', () => {
  it('should return subtotal price of each item', () => {
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
        price: 15.00, amount: 1
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 1
      }

    ];
    let expected = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 2, originSubTotal: 6.00
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 1, originSubTotal: 15.00
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 1, originSubTotal: 4.5
      }

    ];

    let actual = core.calculateOriginSubtotal(cartItems);
    expect(actual).toEqual(expected);
  })
});

describe('calculateDiscount', () => {
  it('should return discount price of each item', () => {
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
        price: 15.00, amount: 1
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 1
      }
    ];
    let buyTwoFreeOneItems = ['ITEM000001', 'ITEM000005'];
    let discountedList = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 3, originSubTotal: 9.00, discount: 3.00
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 1, originSubTotal: 15.00, discount: 0
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 3, originSubTotal: 13.50, discount: 9.00
      }
    ];
    let actual = core.calculateDiscount(buyTwoFreeOneItems, cartItems);
    expect(actual).toEqual(discountedList);
  })
});

describe('getTotalPrice', () => {
  it('should return total price of all item', () => {
    let subTotalCartItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 3, originSubTotal: 9.00, discount: 3.00, subTotal:6
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 1, originSubTotal: 15.00, discount: 0, subTotal:15.00
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 3, originSubTotal: 13.50, discount: 4.50, subTotal:9.00
      }
    ];
    let expected = 37.50 - 7.5;

    let actual = core.getTotalPrice(subTotalCartItems);
    expect(actual).toEqual(expected);
  })
});

describe('generateReceipt', () => {
  it('should return receipt of input tags', () => {
    let subTotalCartItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 3, originSubTotal: 9.00, discount: 3.00, subTotal: 6.00
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 1, originSubTotal: 15.00, discount: 0, subTotal: 15.00
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 3, originSubTotal: 13.50, discount: 4.50, subTotal: 9.00
      }
    ];
    let totalPrice = 30;

    let actual = core.generateReceipt(subTotalCartItems, totalPrice);
    expect(actual).toEqual(expected);
  })
});

