/*global require,describe,it,expect*/
const num = require("../src/app")
describe("despiteBarcodes", function () {
    it("should return the despitedBarcode", function () {
        let barcodes = [
            'ITEM000001',
            'ITEM000002-2',
            'ITEM000001-2',
            'ITEM000003-2',
            'ITEM000003-2.5',
        ];
        let despitedBarcode = [
            {
                barcode: "ITEM000001",
                amount: 1
            },
            {
                barcode: "ITEM000002",
                amount: 2
            },
            {
                barcode: "ITEM000001",
                amount: 2
            },
            {
                barcode: "ITEM000003",
                amount: 2
            },
            {
                barcode: "ITEM000003",
                amount: 2.5
            }
            ];
        expect(num.despiteBarcodes(barcodes)).toEqual(despitedBarcode);
    });
});
describe("mergeItems", function () {
    it("should return the itemAmounts", function () {
        let despitedBarcode = [
            {
                barcode: "ITEM000001",
                amount: 1
            },
            {
                barcode: "ITEM000002",
                amount: 2
            },
            {
                barcode: "ITEM000001",
                amount: 2
            },
            {
                barcode: "ITEM000003",
                amount: 2
            },
            {
                barcode: "ITEM000003",
                amount: 2.5
            }
        ];
        let itemAmounts = [
            {
                barcode: "ITEM000001",
                amount: 3
            },
            {
                barcode: "ITEM000002",
                amount: 2
            },
            {
                barcode: "ITEM000003",
                amount: 4.5
            }
        ];
        expect(num.mergeItems(despitedBarcode)).toEqual(itemAmounts);
    });
});
describe("matchCartItems", function () {
    it("should return the cartItems", function () {
        let itemAmounts = [
            {
                barcode: "ITEM000001",
                amount: 3
            },
            {

                barcode: "ITEM000002",
                amount: 2
            },
            {
                barcode: "ITEM000003",
                amount: 4.5
            }
        ];
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
        let cartItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5
            }
        ];
        expect(num.matchCartItems(itemAmounts, allItems)).toEqual(cartItems);
    });
});
describe("calculateSubtotals", function () {
    it("should return the subtotals", function () {
        let cartItems = [

            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5
            }
        ];
        let subtotals = [

            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2,
                subtotal: 11
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5,
                subtotal: 67.5
            }

        ];
        expect(num.calculateSubtotals(cartItems)).toEqual(subtotals);
    });
});
describe("calculateAlltotals", function () {
    it("should return the alltotals", function () {
        let subtotals = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2,
                subtotal: 11
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5,
                subtotal: 67.5
            }
        ];
        let alltotal = 87.5;
        expect(num.calculateAlltotals(subtotals)).toEqual(alltotal);
    });
});

describe("mergePromotionType", function () {
    it("should return the promotedItems", function () {
       let subtotals = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2,
                subtotal: 11
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5,
                subtotal: 67.5
            }
        ];
        let promotions = [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001',
                    'ITEM000005'
                ]
            }
        ];
        let promotedItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                type: 'BUY_TWO_GET_ONE_FREE'
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2,
                subtotal: 11,
                type: "none"
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5,
                subtotal: 67.5,
                type: "none"
            }
        ];
        expect(num.mergePromotionType(subtotals,promotions)).toEqual(promotedItems);
    });
});
describe("promoteItemAmount", function () {
    it("should return the promotedAmount", function () {
        let promotedItems = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                type: 'BUY_TWO_GET_ONE_FREE'
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2,
                subtotal: 11,
                type: "none"
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5,
                subtotal: 67.5,
                type: "none"
            }
        ];
        let promotedAmount = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                type: 'BUY_TWO_GET_ONE_FREE',
                proAmount:2
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2,
                subtotal: 11,
                type: "none",
                proAmount:2
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5,
                subtotal: 67.5,
                type: "none",
                proAmount:4.5
            }
        ];
        expect(num.promoteItemAmount(promotedItems)).toEqual(promotedAmount);
    });
});
describe("calculatePromotionSubtotals",function(){
    it("should return the promotedSubtotals",function(){
        let promotedAmount = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                type: 'BUY_TWO_GET_ONE_FREE',
                proAmount:2
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2,
                subtotal: 11,
                type: "none",
                proAmount:2,
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5,
                subtotal: 67.5,
                type: "none",
                proAmount:4.5
            }
        ];
        let promotedSubtotals = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                type: 'BUY_TWO_GET_ONE_FREE',
                proAmount:2,
                promotedSubtotal:6
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2,
                subtotal: 11,
                type: "none",
                proAmount:2,
                promotedSubtotal:11
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5,
                subtotal: 67.5,
                type: "none",
                proAmount:4.5,
                promotedSubtotal:67.5
            }
        ];
        expect(num.calculatePromotionSubtotals(promotedAmount)).toEqual(promotedSubtotals);
    });
});
describe("calculatePromotionAlltotals",function(){
    it("should return the promotedAlltotals",function (){
        let promotedSubtotals = [
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount: 3,
                subtotal: 9,
                type: 'BUY_TWO_GET_ONE_FREE',
                proAmount:2,
                promotedSubtotal:6
            },
            {
                barcode: 'ITEM000002',
                name: '苹果',
                unit: '斤',
                price: 5.50,
                amount: 2,
                subtotals: 11,
                type: "none",
                proAmount:2,
                promotedSubtotal:11
            },
            {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00,
                amount: 4.5,
                subtotals: 67.5,
                type: "none",
                proAmount:4.5,
                promotedSubtotal:67.5
            }
        ];
        let promotedAlltotal = 84.5;
        expect(num.calculatePromotionAlltotal(promotedSubtotals)).toEqual(promotedAlltotal);
    });
});
describe("calculatePromotionCash",function(){
    it("should return the promoteCash",function(){
        let alltotal = 87.5;
        let promotedAlltotal = 84.5;
        let promoteCash = 3;
    expect(num.calculatePromotionCash(alltotal,promotedAlltotal)).toEqual(promoteCash);
});
});
