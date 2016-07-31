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

describe('getDiscountedItems', () => {
  it('should return a cartItems with discount of each item', () => {
    let cartItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 3
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
        price: 4.50, amount: 3
      }
    ];
    let buyTwoFreeOneItems = ['ITEM000001', 'ITEM000005'];
    let discountedList = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 3, discount: 3.00
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 1, discount: 0
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 3, discount: 4.5
      }
    ];
    let actual = core.getDiscountedItems(buyTwoFreeOneItems, cartItems);
    expect(actual).toEqual(discountedList);
  })
});

describe('getSubTotalCartItems', () => {
  it('should return subtotal price of each item', () => {
    let originSubTotalCartItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 3, originSubTotal: 9.00
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
        price: 4.50, amount: 3, originSubTotal: 13.5
      }

    ];
    let discountedList = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 3, discount: 3
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 1, discount: 0
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 3, discount: 4.5
      }
    ];
    let expected = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 3, originSubTotal: 9.00, subTotal: 6.00, discount: 3.00
      },
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 1, originSubTotal: 15.00, subTotal: 15, discount: 0
      },
      {
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50, amount: 3, originSubTotal: 13.5, subTotal: 9, discount: 4.50
      }

    ];
    let actual = core.getSubTotalCartItems(originSubTotalCartItems, discountedList);
    expect(actual).toEqual(expected);
  })
});

describe('getTotalPrice', () => {
  it('should return total price of all item', () => {
    let subTotalCartItems = [
      {
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00, amount: 3, originSubTotal: 9.00, discount: 3.00, subTotal: 6
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
    let expected = 37.50;

    let actual = core.getTotalPrice(subTotalCartItems);
    expect(actual).toEqual(expected);
  })
});

describe('generateReceipt', () => {
  it('should return a receipt with promotion information when input cartItems are promoting', () => {
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
    const expectedReceipt = `***<没钱赚商店>收据***
名称：雪碧，数量：3瓶，单价：3.00(元)，小计：9.00(元)
名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：13.50(元)
----------------------
总计：30.00(元)
节省：7.50(元)
**********************`;
    let actual = core.generateReceipt(subTotalCartItems, totalPrice);
    expect(actual).toEqual(expectedReceipt);
  });

  it('should return a receipt without promotion without promoting item ', () => {
    let subTotalCartItems = [
      {
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00, amount: 1, originSubTotal: 15.00, discount: 0, subTotal: 15.00
      }
    ];
    let totalPrice = 15.00;
    const expectedReceipt = `***<没钱赚商店>收据***
名称：荔枝，数量：1斤，单价：15.00(元)，小计：15.00(元)
----------------------
总计：15.00(元)
**********************`;

    let actual = core.generateReceipt(subTotalCartItems, totalPrice);
    expect(actual).toEqual(expectedReceipt);
  })
});

describe('printReceiptText', () => {
  it('should return a receipt with promotion information when input cartItems are promoting', () => {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
    ];
    const expectedReceiptText = `***<没钱赚商店>收据***
名称：雪碧，数量：3瓶，单价：3.00(元)，小计：9.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：1袋，单价：4.50(元)，小计：4.50(元)
----------------------
总计：43.50(元)
节省：3.00(元)
**********************`;
    let actual = core.printReceiptText(tags);
    expect(actual).toEqual(expectedReceiptText);
  });

  it('should return a receipt without promotion without promoting item ', () => {
    const tags = [
      'ITEM000003-2'
    ];

    const expectedReceiptText = `***<没钱赚商店>收据***
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
----------------------
总计：30.00(元)
**********************`;

    let actual = core.printReceiptText(tags);
    expect(actual).toEqual(expectedReceiptText);
  })
});
