'use strict'
const a=require('../src/app');
const b=require('./fixture');
describe('formatTag',function(){
    it('show .',function(){
        let tags=['ITE00','ITE00','ITE00-0.5','ITE01','ITE01','ITE02'];
        expect(a.formatTags(tags)).toEqual([{ barcode: 'ITE00', amount: 1 },{ barcode: 'ITE00', amount: 1 },
            { barcode: 'ITE00', amount: 0.5 },{ barcode: 'ITE01', amount: 1 },{ barcode: 'ITE01', amount: 1 },
            { barcode: 'ITE02', amount: 1 }]);
    })
})
describe('mergedBarcodes',function () {
    it('show ',function () {
        let barcodes=[{ barcode: 'ITE00', amount: 1 },{ barcode: 'ITE00', amount: 1 },{ barcode: 'ITE00', amount: 0.5 },
            { barcode: 'ITE01', amount: 1 },{ barcode: 'ITE01', amount: 1 },{ barcode: 'ITE02', amount: 1 }];
       expect(a.mergedBarcodes(barcodes)).toEqual([{ barcode: 'ITE00', amount: 2.5 },
           { barcode: 'ITE01', amount: 2 },{ barcode: 'ITE02', amount: 1 }]);
    })
})
describe('getCartItems',function(){
    it('show',function () {
        'ITEM000000',
            'ITEM000001',
            'ITEM000005'
        let items=b.loadAllItems();
        let accountedBarcodes=[{ barcode:  'ITEM000000', amount: 2 }];
        expect(a.getCartItems(items,accountedBarcodes)).toEqual(
            [{ barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, amount: 2 }]);
    })
})
describe('getSubtotal',function () {
    it('show ',function () {
        let cartItems=[{ barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, amount: 2 }];
        expect(a.getSubtotal(cartItems)).toEqual([{ barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, amount: 2,
            subtotal: 6 }]);
    })
})
describe('getTotal',function () {
    it('show',function () {
        let detailedCartItems=[{ barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, amount: 2,
            subtotal: 6 }];
        expect(a.getTotal(detailedCartItems)).toEqual(6);
    })
})
describe('getCartPromotionItems',function () {
    it('show',function () {
        let detailedCartItems=[{ barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3, amount: 2,
            subtotal: 6 }, {barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.50,amount:3,subtotal:16.5}];
        let promotions=b.loadPromotions();
        expect(a.getCartPromotionItems(detailedCartItems,promotions)).toEqual([{ barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3,
            amount: 2, subtotal: 3 },{ barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, amount: 3, subtotal: 16.5 }]);
    })
})
describe('getPromotionTotal',function () {
    it('show ',function () {
        let cartPromotionItems=[{ barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3,
            amount: 2, subtotal: 3 },{ barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, amount: 3, subtotal: 16.5 }];
        expect(a.getPromotionTotal(cartPromotionItems)).toEqual(19.5);
    })
})
describe('print',function () {
    it('show ,',function () {
        let CartPromotionItems=[{ barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3,
            amount: 2, subtotal: 3 },{ barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5, amount: 3, subtotal: 16.5 }];
        let total=22.5;
        let promotionTotal=19.5;
        let result='<没钱赚商店>收据***\n名称：可口可乐，数量：2瓶，单价：3.00（元），小计：3.00（元）\n名称：苹果，数量：3斤，单价：5.50（元）' +
            '，小计：16.50（元）\n------------\n总计：19.50（元）\n节省：3.00（元）\n*************************'.trim();
        expect(a.print(CartPromotionItems,total,promotionTotal)).toEqual(result);
    })
})
// describe('getPromotionTotal',function () {
//     it('show',function () {
//         let
//     })
// })
describe('printReceipt',function () {
    it('show ..',function () {
        let tags=['ITEM000000','ITEM000000','ITEM000002','ITEM000002','ITEM000002'];
        let result='<没钱赚商店>收据***\n名称：可口可乐，数量：2瓶，单价：3.00（元），小计：3.00（元）\n名称：苹果，数量：3斤，单价：5.50（元）' +
            '，小计：16.50（元）\n------------\n总计：19.50（元）\n节省：3.00（元）\n*************************'.trim();
        expect(a.printReceipt(tags)).toEqual(result);
    })
})