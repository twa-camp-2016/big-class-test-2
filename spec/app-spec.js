'use strict'
const obj1=require('../src/app.js');
//const obj2=require('fixture.js');

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
            ]
         let result=obj1.getBarcodeAmount(allTags);
        expect(result).toEqual(expected);
    });
});

// describe("loadAllItems",function () {
//     it("get all items information")
//
// })