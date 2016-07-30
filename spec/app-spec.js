const obj = require("../../src/app");
describe("delFrame", function () {
    it("delete the frame", function () {
        let cartTags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
        ];
        let result = obj.delFrame(cartTags);
        let expected = [
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 2}];
        expect(result).toEqual(expected);
    });
});
describe("megerBarcode", function () {
    it("meger the barcode", function () {
        let cartBarcodes = [
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 2}];
        let result = obj.megerBarcode(cartBarcodes);
        let expected = [
            {barcode: 'ITEM000001', amount: 2},
            {barcode: 'ITEM000003', amount: 2}];
        expect(result).toEqual(expected);
    });
});
describe("matchCartItems", function () {
    it("meger the barcode", function () {
        let cartBarcodes = [
            {barcode: 'ITEM000001', amount: 2},
            {barcode: 'ITEM000003', amount: 2}];
        let shopItems = [
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
        let result = obj.matchCartItems(cartBarcodes,shopItems);
        let expected = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 2
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2
            }];
        expect(result).toEqual(expected);
    });
});
describe("matchPromotionsItems", function () {
    it("meger the barcode", function () {
        let cartItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 2
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2
            }];
        let promotionsBarcodes =  [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001',
                    'ITEM000005'
                ]
            }
        ];
        let result = obj.matchPromotionsItems(cartItems,promotionsBarcodes);
        let expected = [
                {
                    type: 'BUY_TWO_GET_ONE_FREE',
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00,
                    amount: 2
                },
                {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00,
                    amount: 2
                }];
        expect(result).toEqual(expected);
    });
});
describe("calculateDiscountSubtotal", function () {
    it("meger the barcode", function () {
    let promotionsCartItems = [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            amount: 3
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00,
            amount: 2
        }];
        let result = obj.calculateDiscountSubtotal(promotionsCartItems);
        let expected=[
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                discountSubtotal:6.00

            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2
            }];
        expect(result).toEqual(expected);
    });
});
describe("calculateSubtotal", function () {
    it("calculate allItems Subtotal", function () {
        let promotionsCartItems = [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                discountSubtotal:6.00,
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2
            }];
        let result = obj.calculateDiscountSubtotal(promotionsCartItems);
        let expected=[
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                discountSubtotal:6.00,
                subtotal:9.00
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 2,
                subtotal:30.00
            }];
        expect(result).toEqual(expected);
    });
});