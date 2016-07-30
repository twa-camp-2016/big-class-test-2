'use strict';
/*global require*/
const obj1=require('../src/app.js');


describe("formatBarcodes",function () {
    fit("get all barcodes and amount",function () {
        let tags=[
            'ITEM000001','ITEM000001','ITEM000001', 'ITEM000003-2'
        ];
        let expected=[
            {barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000003',amount:2}
        ];
        let result=obj1.formatBarcodes(tags);
        expect(result).toEqual(expected);
    });
});

describe("getBarcodeAmount",function () {
    fit("calculate amount",function () {
        let allTags=[
            {barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000001',amount:1},
            {barcode:'ITEM000003',amount:2}
        ];
        let expected=[
                {barcode:'ITEM000001',amount:3},
                {barcode:'ITEM000003',amount:2}
            ];
         let result=obj1.getBarcodeAmount(allTags);
        expect(result).toEqual(expected);
    });
});

describe("getCartItems",function () {
       fit("get all cartItems information",function () {
           let finalBarcodes=[
               {barcode:'ITEM000001',amount:3},
               {barcode:'ITEM000003',amount:2}
           ];
           let expected=[
               {barcode:'ITEM000001',amount:3,name:"雪碧",unit: '瓶', price: 3.00},
               {barcode:'ITEM000003',amount:2,name: '荔枝', unit: '斤', price: 15.00}
           ];
           let result=obj1.getCartItems(finalBarcodes);
           expect(result).toEqual(expected);
       });
});


describe("getPromotions",function () {
    it("get promote information",function () {
        let allItems=[
            {barcode:'ITEM000001',amount:3,name:"雪碧",unit: '瓶', price: 3.00},
            {barcode:'ITEM000005',amount:2,name:"方便面", unit: "袋", price: 4.50}
        ];
        let expected=[
            {barcode:'ITEM000001',amount:3,name:"雪碧",unit: '瓶', price: 3.00,type: 'BUY_TWO_GET_ONE_FREE'},
            {barcode:'ITEM000005',amount:2,name:"方便面", unit: "袋", price: 4.50,type: 'BUY_TWO_GET_ONE_FREE'}
        ];
        let result=obj1.getPromotions(allItems);
        expect(result).toEqual(expected);
    });
});

describe("getUnPromoteSubtotal",function () {
    fit("get UnPromoteSubtotal",function () {
        let allPromoteItems=[
            {barcode:'ITEM000001',amount:3,name:"雪碧",unit: '瓶', price: 3.00,type: 'BUY_TWO_GET_ONE_FREE'},
            {barcode:'ITEM000005',amount:2,name:"方便面", unit: "袋", price: 4.50,type: 'BUY_TWO_GET_ONE_FREE'}
        ];
        let expected=[
            {barcode:'ITEM000001',amount:3,name:"雪碧",unit: '瓶', price: 3.00,type: 'BUY_TWO_GET_ONE_FREE',unPromoteSubtotal:9},
            {barcode:'ITEM000005',amount:2,name:"方便面", unit: "袋", price: 4.50,type: 'BUY_TWO_GET_ONE_FREE',unPromoteSubtotal:9}
        ];
        let result=obj1.getUnPromoteSubtotal(allPromoteItems);
        expect(result).toEqual(expected);
    })
})