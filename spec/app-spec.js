'use strict';
const app = require("../src/app.js");
const fixture = require("./fixture.js");
// describe("test splitTag", function () {
//     it("show splitTag", function () {
//         let tags = ['ITEM000001', 'ITEM000003-2','ITEM000002-2.5'];
//         let result = app.splitTag(tags);
//         expect(result).toEqual([
//             {
//                 "barcode": "ITEM000001",
//                 "count": 1
//             },
//             {
//                 "barcode": "ITEM000003",
//                 "count": 2
//             },{
//                 "barcode": "ITEM000002",
//                 "count": 2.5
//             }
//         ]);
//     })
// });

// describe("test getTagCount", function () {
//     it("show getTagCount", function () {
//         let splitTag = [{
//             barcode: 'ITEM000002',
//             count: 1
//         }, {
//             barcode: 'ITEM000001',
//             count: 2
//         }, {
//             barcode: 'ITEM000001',
//             count: 3
//         }];
//
//         let result = app.getTagCount(splitTag);
//
//         expect(result).toEqual([
//             {
//                 barcode: 'ITEM000002',
//                 count: 1
//             }, {
//                 barcode: 'ITEM000001',
//                 count: 5
//             }
//         ])
//     })
// });

// describe("test matchPromotion", function () {
//     it("show matchPromotion", function () {
//         let allTagCount = [
//             {
//                 barcode: 'ITEM000005',
//                 count: 1
//             }, {
//                 barcode: 'ITEM000001',
//                 count: 2
//             }
//         ];
//         let promotion = fixture.loadPromotions();
//         let result = app.matchPromotion(allTagCount, promotion);
//         expect(result).toEqual([
//             {
//                 barcode: 'ITEM000005',
//                 type: 'BUY_TWO_GET_ONE_FREE',
//                 count: 1
//             }, {
//                 barcode: 'ITEM000001',
//                 type: 'BUY_TWO_GET_ONE_FREE',
//                 count: 2
//             }
//         ]);
//     })
// })

// describe('test matchItems', function () {
//     it('show cartItemsCount', function () {
//         let itemsPromotion = [
//             {
//                 barcode: 'ITEM000002',
//                 type: 'BUY_TWO_GET_ONE_FREE',
//                 count: 1
//             }, {
//                 barcode: 'ITEM000001',
//                 type: 'BUY_TWO_GET_ONE_FREE',
//                 count: 2
//             }
//         ];
//         let allItems=fixture.loadAllItems();
//         let result = app.matchItems(itemsPromotion, allItems);
//         expect(result).toEqual([
//             {
//                 barcode: 'ITEM000002',
//                 name: '苹果',
//                 unit: '斤',
//                 price: 5.50,
//                 count:1,
//                 type:'BUY_TWO_GET_ONE_FREE'
//             }, {
//                 barcode: 'ITEM000001',
//                 name: '雪碧',
//                 unit: '瓶',
//                 price: 3.00,
//                 count: 2,
//                 type: 'BUY_TWO_GET_ONE_FREE'
//             }
//         ]);
//     })
// })

// describe('test getDiscountSubtotal', function () {
//     it('show discountSubtotal', function () {
//         let cartItemsCount = [
//             {
//                 barcode: 'ITEM000002',
//                 name: '苹果',
//                 unit: '斤',
//                 price: 5.50,
//                 count:1,
//                 type:'BUY_TWO_GET_ONE_FREE'
//             }, {
//                 barcode: 'ITEM000001',
//                 name: '雪碧',
//                 unit: '瓶',
//                 price: 3.00,
//                 count: 6,
//                 type: 'BUY_TWO_GET_ONE_FREE'
//             }];
//         let promotion = fixture.loadPromotions();
//         let result=app.getDiscountSubtotal(cartItemsCount,promotion);
//         expect(result).toEqual([
//             {
//                 barcode: 'ITEM000002',
//                 name: '苹果',
//                 unit: '斤',
//                 price: 5.50,
//                 count: 1,
//                 type: 'BUY_TWO_GET_ONE_FREE',
//                 discountSubtotalSum:5.50
//             }, {
//                 barcode: 'ITEM000001',
//                 name: '雪碧',
//                 unit: '瓶',
//                 price: 3.00,
//                 count: 6,
//                 type: 'BUY_TWO_GET_ONE_FREE',
//                 discountSubtotalSum:12.00
//             }
//         ]);
//
//     })
// })
// describe('test getSubtotal',function () {
//     it('show subtotal',function () {
//         let cartItemsCount=[
//             {
//                 barcode: 'ITEM000002',
//                 name: '苹果',
//                 unit: '斤',
//                 price: 5.50,
//                 count:1,
//                 type:'BUY_TWO_GET_ONE_FREE'
//             }, {
//                 barcode: 'ITEM000001',
//                 name: '雪碧',
//                 unit: '瓶',
//                 price: 3.00,
//                 count: 6,
//                 type: 'BUY_TWO_GET_ONE_FREE'
//             }
//         ];
//         let result=app.getSubtotal(cartItemsCount);
//         expect(result).toEqual([
//             {
//                 barcode: 'ITEM000002',
//                 name: '苹果',
//                 unit: '斤',
//                 price: 5.50,
//                 count:1,
//                 type:'BUY_TWO_GET_ONE_FREE',
//                 noDiscountSubtotal:5.50
//             }, {
//                 barcode: 'ITEM000001',
//                 name: '雪碧',
//                 unit: '瓶',
//                 price: 3.00,
//                 count: 6,
//                 type: 'BUY_TWO_GET_ONE_FREE',
//                 noDiscountSubtotal:18
//             }
//         ]);
//     })
// })

// describe('test getSaveTotal',function () {
//     it('show saveTotal',function () {
//         let discountSubtotal=[ {
//             barcode: 'ITEM000002',
//             name: '苹果',
//             unit: '斤',
//             price: 5.50,
//             count: 1,
//             type: 'BUY_TWO_GET_ONE_FREE',
//             discountSubtotalSum:5.50
//         }, {
//             barcode: 'ITEM000001',
//             name: '雪碧',
//             unit: '瓶',
//             price: 3.00,
//             count: 6,
//             type: 'BUY_TWO_GET_ONE_FREE',
//             discountSubtotalSum:12.00
//         }];
//         let subtotal=[ {
//             barcode: 'ITEM000002',
//             name: '苹果',
//             unit: '斤',
//             price: 5.50,
//             count:1,
//             type:'BUY_TWO_GET_ONE_FREE',
//             noDiscountSubtotal:5.50
//         }, {
//             barcode: 'ITEM000001',
//             name: '雪碧',
//             unit: '瓶',
//             price: 3.00,
//             count: 6,
//             type: 'BUY_TWO_GET_ONE_FREE',
//             noDiscountSubtotal:18
//         }];
//         let result=app.getSaveTotal(discountSubtotal,subtotal);
//         expect(result).toEqual(6);
//     })
// })

// describe('test getTotal',function () {
//     it('show total',function () {
//         let discountSubtotal=[{
//             barcode: 'ITEM000002',
//             name: '苹果',
//             unit: '斤',
//             price: 5.50,
//             count: 1,
//             type: 'BUY_TWO_GET_ONE_FREE',
//             discountSubtotalSum:5.50
//         }, {
//             barcode: 'ITEM000001',
//             name: '雪碧',
//             unit: '瓶',
//             price: 3.00,
//             count: 6,
//             type: 'BUY_TWO_GET_ONE_FREE',
//             discountSubtotalSum:12.00
//         }];
//         let result=app.getTotal(discountSubtotal);
//         expect(result).toEqual(17.5);
//     })
// })

describe("test printReceipt", function () {
    it("show receiptText", function () {
        const tags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2.5',
            'ITEM000005',
            'ITEM000005-2',
        ];
        spyOn(console, 'log');
        app.printReceipt(tags);
        const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00元，小计：12.00元
名称：荔枝，数量：2.5斤，单价：15.00元，小计：37.50元
名称：方便面，数量：3袋，单价：4.50元，小计：9.00元
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;
        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});

