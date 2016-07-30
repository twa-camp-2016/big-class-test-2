const app = require('../src/app');
const loadInfo = require("../spec/fixture.js");

describe('printReceipt', function () {
    it('should return receipt', function () {
        let tags = [
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
        let result = app.printReceipt(tags);
        let expected = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`.trim();
        expect(result).toEqual(expected);
    });
});


describe("formatTags", function () {
    it("should return tags with barcode and count", function () {
        let tags = [
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
        let result = app.formatTags(tags);
        let expected = [
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000003', count: 2},
            {barcode: 'ITEM000005', count: 1},
            {barcode: 'ITEM000005', count: 1},
            {barcode: 'ITEM000005', count: 1},
            ];
        expect(result).toEqual(expected);
    });
});

describe('mergebarcode', function () {
    it('should return mergedbarcodes', function () {
        let barcodes =  [
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000001', count: 1},
            {barcode: 'ITEM000003', count: 2},
            {barcode: 'ITEM000005', count: 1},
            {barcode: 'ITEM000005', count: 1},
            {barcode: 'ITEM000005', count: 1},
        ];
        let result = app.mergeBarcodes(barcodes);
        let expected = [
            {barcode: 'ITEM000001', count: 5},
            {barcode: 'ITEM000003', count: 2},
            {barcode: 'ITEM000005', count: 3},
        ];
        expect(result).toEqual(expected);
    });
});

describe('getCartItems', function () {
    it('should return cartItems', function () {
        let mergedBarcodes = [
            {barcode: 'ITEM000001', count: 5},
            {barcode: 'ITEM000003', count: 2},
            {barcode: 'ITEM000005', count: 3},
        ];
        let items = loadInfo.loadAllItems();
        let result = app.getCartItems(mergedBarcodes, items);
        let expected = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 5
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count: 2
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 3
            }];
        expect(result).toEqual(expected);
    });
});

describe('getSubTotalItems', function () {
    it('should return subTotalItems', function () {
        let cartItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 5
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count: 2
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 3
            }];
        let result = app.getSubTotalItems(cartItems);
        let expcted = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 5,
                subTotal: 15
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count: 2,
                subTotal: 30
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 3,
                subTotal: 13.5
            }];
        expect(result).toEqual(expcted);
    })
})

describe('getDiscountSubTotalItems', function () {
    it('should return discountsubtotal', function () {
        let subTotalItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 5,
                subTotal: 15
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count: 2,
                subTotal: 30
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 3,
                subTotal: 13.5
            }];
        let promotions = loadInfo.loadPromotions();
        let result = app.getDiscountSubTotalItems(subTotalItems, promotions);
        let expected = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 5,
                subTotal: 15,
                discountSubTotal: 12
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count: 2,
                subTotal: 30,
                discountSubTotal: 30
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 3,
                subTotal: 13.5,
                discountSubTotal: 9
            }];
        expect(result).toEqual(expected);
    })
});

describe('getSave', function () {
    it('should return save', function () {
        let discountSubTotalItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 5,
                subTotal: 15,
                discountSubTotal: 12
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count: 2,
                subTotal: 30,
                discountSubTotal: 30
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 3,
                subTotal: 13.5,
                discountSubTotal: 9
            }];
        let result = app.getSave(discountSubTotalItems);
        let expected = 7.5;
        expect(result).toEqual(expected);
    })
});

describe('getTotal', function () {
    it('should return total', function () {
        let discountSubTotalItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 5,
                subTotal: 15,
                discountSubTotal: 12
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count: 2,
                subTotal: 30,
                discountSubTotal: 30
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 3,
                subTotal: 13.5,
                discountSubTotal: 9
            }];
        let result = app.getTotal(discountSubTotalItems);
        let total = 51;
        expect(result).toEqual(total);
    })
});

describe('print', function () {
    it('should return receipt', function () {
        let discountSubTotalItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 5,
                subTotal: 15,
                discountSubTotal: 12
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                count: 2,
                subTotal: 30,
                discountSubTotal: 30
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                count: 3,
                subTotal: 13.5,
                discountSubTotal: 9
            }];
        let save = 7.5;
        let total = 51;
        let result = app.print(discountSubTotalItems, save, total);
        let expected = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`.trim();
        expect(result).toEqual(expected);
    });
});










