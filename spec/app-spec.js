'use strict';
const pos = require("../src/app.js");
const fixture = require("../spec/fixture.js");
describe("test splitTag", function () {
    it("show splitTag", function () {
        let tags = ['ITEM000001', 'ITEM000001-2'];
        let result = pos.splitTag(tags);

        expect(result).toEqual([
            {
                "barcode": "ITEM000001",
                "count": 1
            },
            {
                "barcode": "ITEM000001",
                "count": 2
            }
        ]);
    })
});

describe("test getTagCount", function () {
    it("show getTagCount", function () {
        let splitTag = [{
            barcode: 'ITEM000002',
            count: 1
        }, {
            barcode: 'ITEM000001',
            count: 1
        }, {
            barcode: 'ITEM000001',
            count: 1
        }];

        let result = pos.getTagCount(splitTag);

        expect(result).toEqual([
            {
                barcode: 'ITEM000002',
                count: 1
            }, {
                barcode: 'ITEM000001',
                count: 2
            }
        ])
    })
})

describe("test matchPromotion", function () {
    it("show matchPromotion", function () {
        let allTagCount = [
            {
                barcode: 'ITEM000005',
                count: 1
            }, {
                barcode: 'ITEM000001',
                count: 2
            }
        ];
        let promotion = {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        };
        let result = pos.matchPromotion(allTagCount, promotion);
        expect(result).toEqual([
            {
                barcode: 'ITEM000005',
                type: 'BUY_TWO_GET_ONE_FREE',
                count: 1
            }, {
                barcode: 'ITEM000001',
                type: 'BUY_TWO_GET_ONE_FREE',
                count: 2
            }
        ]);
    })
})

describe('test matchItems', function () {
    it('show cartItemsCount', function () {
        let itemsPromotion = [
            {
                barcode: 'ITEM000002',
                type: 'BUY_TWO_GET_ONE_FREE',
                count: 1
            }, {
                barcode: 'ITEM000001',
                type: 'BUY_TWO_GET_ONE_FREE',
                count: 2
            }
        ];
        let allItems = [
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
            }
        ];

        let result = pos.matchItems(itemsPromotionm, allItems);
        expect(result).toEqual([
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                count: 1,
                type: 'BUY_TWO_GET_ONE_FREE'
            }, {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 2,
                type: 'BUY_TWO_GET_ONE_FREE'
            }
        ]);
    })
})

describe('test getDiscountSubtotal', function () {
    it('show discountSubtotal', function () {
        let cartItemsCount = [
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                count: 1,
                type: 'BUY_TWO_GET_ONE_FREE'
            }, {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 6,
                type: 'BUY_TWO_GET_ONE_FREE'
            }];
        let promotion = {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000002'
            ]
        };
        let result=pos.getDiscountSubtotal(cartItemsCount,promotion);
        expect(result).toEqual([
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                count: 1,
                type: 'BUY_TWO_GET_ONE_FREE',
                discountSubtotal:5.50
            }, {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 6,
                type: 'BUY_TWO_GET_ONE_FREE',
                discountSubtotal:12.00
            }
        ]);

    })
})
