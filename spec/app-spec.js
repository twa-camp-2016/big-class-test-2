'use strict';
const app = require('../src/app.js');

describe('formatTags test', function () {
    it('type one test', function () {
        let input = [
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005'
        ];
        let result = app.formatTags(input);
        expect(result).toEqual([
            {
                barcode: 'ITEM000001',
                amount: 1
            },
            {
                barcode: 'ITEM000003',
                amount: 2
            },
            {
                barcode: 'ITEM000005',
                amount: 1
            },
            {
                barcode: 'ITEM000005',
                amount: 1
            }]);
    });
});

describe('mergeBarcodes test', function () {
    it('type one test', function () {
        let input = [
            {
                barcode: 'ITEM000001',
                amount: 1
            },
            {
                barcode: 'ITEM000003',
                amount: 2
            },
            {
                barcode: 'ITEM000005',
                amount: 1
            },
            {
                barcode: 'ITEM000005',
                amount: 1
            }];
        let result = app.mergeBarcodes(input);
        expect(result).toEqual([
            {
                barcode: 'ITEM000001',
                amount: 1
            },
            {
                barcode: 'ITEM000003',
                amount: 2
            },
            {
                barcode: 'ITEM000005',
                amount: 2
            }]);
    });
});
describe('matchProType test', function () {
    it('type one test', function () {
        let input1 = [{
            barcode: 'ITEM000001',
            amount: 1
        },
            {
                barcode: 'ITEM000003',
                amount: 2
            },
            {
                barcode: 'ITEM000005',
                amount: 2
            }];
        let input2 = [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001',
                    'ITEM000005'
                ]
            }
        ];
        let result = app.matchProType(input1, input2);
        expect(result).toEqual([{
            barcode: 'ITEM000001',
            amount: 1,
            type: 'BUY_TWO_GET_ONE_FREE'
        },
            {
                barcode: 'ITEM000003',
                amount: 2,
                type: '-1'

            },
            {
                barcode: 'ITEM000005',
                amount: 2,
                type: 'BUY_TWO_GET_ONE_FREE'
            }]);
    });
});
describe('getCartItems test', function () {
    it('type one test', function () {
        let proItems = [{
            barcode: 'ITEM000001',
            amount: 1,
            type: 'BUY_TWO_GET_ONE_FREE'
        },
            {
                barcode: 'ITEM000003',
                amount: 2,
                type: '-1'

            },
            {
                barcode: 'ITEM000005',
                amount: 2,
                type: 'BUY_TWO_GET_ONE_FREE'
            }];
        let allItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
            },
            {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00
            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
            }
        ];
        let result = app.getCartItems(proItems, allItems);
        expect(result).toEqual([{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 1,
            type: 'BUY_TWO_GET_ONE_FREE'
        },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2,
                type: '-1'

            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                amount: 2,
                type: 'BUY_TWO_GET_ONE_FREE'
            }]);
    });
});
describe('total test', function () {
    it('type one test', function () {
        let input = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 1,
            type: 'BUY_TWO_GET_ONE_FREE',
            subtotal: 3.00
        },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2,
                type: '-1',
                subtotal: 30.00

            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                amount: 2,
                type: 'BUY_TWO_GET_ONE_FREE',
                subtotal: 9.00
            }];
        let result = app.total(input);
        expect(result).toEqual(42.00);
    });
});
describe('getPromotions test', function () {
    it('should equals', function () {
        let result = app.getPromotions(4, 8);
        expect(result).toEqual(4);
    });
});

describe('proSubTotal test', function () {
    it('should equals', function () {
        let input = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 3,
            type: 'BUY_TWO_GET_ONE_FREE'
        },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2,
                type: '-1'

            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                amount: 2,
                type: 'BUY_TWO_GET_ONE_FREE'
            }];
        let result = app.proSubTotal(input);
        expect(result).toEqual([{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 3,
            type: 'BUY_TWO_GET_ONE_FREE',
            subtotal: 6.00
        },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2,
                type: '-1',
                subtotal: 30.00

            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                amount: 2,
                type: 'BUY_TWO_GET_ONE_FREE',
                subtotal: 9.00
            }]);
    });
});
describe('subTotal test', function () {
    it('type one test', function () {
        let input = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 1,
            type: 'BUY_TWO_GET_ONE_FREE'
        },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2,
                type: '-1'

            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                amount: 2,
                type: 'BUY_TWO_GET_ONE_FREE'
            }];
        let result = app.subTotal(input);
        expect(result).toEqual([{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 1,
            type: 'BUY_TWO_GET_ONE_FREE',
            subtotal: 3.00
        },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2,
                type: '-1',
                subtotal: 30.00

            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                amount: 2,
                type: 'BUY_TWO_GET_ONE_FREE',
                subtotal: 9.00
            }]);
    });
});

describe('printStr test', function () {
    it('type one test', function () {
        let proSubItems = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 3,
            type: 'BUY_TWO_GET_ONE_FREE',
            subtotal: 6.00
        },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2,
                type: '-1',
                subtotal: 30.00

            },
            {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50,
                amount: 2,
                type: 'BUY_TWO_GET_ONE_FREE',
                subtotal: 9.00
            }];
        let proSubtotal = 45.00;
        let promotion = 3.00;
        let result = app.printStr(proSubItems, proSubtotal, promotion);
        expect(result).toEqual('***<没钱赚商店>收据***'
            + '\n名称：雪碧，数量：3瓶，单价：3.00(元)，小计：6.00(元)'
            + '\n名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)'
            + '\n名称：方便面，数量：2袋，单价：4.50(元)，小计：9.00(元)'
            + '\n----------------------'
            + '\n总计：45.00(元)'
            + '\n节省：3.00(元)'
            + '\n**********************'
        );
    });
});


describe('printReceipt test', function () {
    it('type one test', function () {
        let tags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005'
        ];
        let result = app.printReceipt(tags);
        expect(result).toEqual('***<没钱赚商店>收据***'
            + '\n名称：雪碧，数量：3瓶，单价：3.00(元)，小计：6.00(元)'
            + '\n名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)'
            + '\n名称：方便面，数量：2袋，单价：4.50(元)，小计：9.00(元)'
            + '\n----------------------'
            + '\n总计：45.00(元)'
            + '\n节省：3.00(元)'
            + '\n**********************'
        );
    });
});