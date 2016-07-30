"use strict"
const temp = require('../src/app.js');
describe("formatTags", function () {
    it("should return formattedTags from tags", function () {
        let tags =
            [
                'ITEM000001',
                'ITEM000002-2'
            ];
        let result = temp.formatTags(tags);
        let formattedTags = 
            [
                {
                    barcode:'ITEM000001',
                    amount:1
                },
                {
                    barcode:'ITEM000002',
                    amount:2 
                }
            ];
        expect(result).toEqual(formattedTags);

    });
});

describe("mergeBarcode",function () {
    it("should return mergedBarcode from formattedTags",function(){
        let formattedTags =
            [
                {
                    barcode:'ITEM000001',
                    amount:1
                },
                {
                    barcode:'ITEM000001',
                    amount:1
                },
                {
                    barcode:'ITEM000002',
                    amount:2
                }
            ];
        let mergedBarcode =
            [
                {
                    barcode:'ITEM000001',
                    amount:2
                },
                {
                    barcode:'ITEM000002',
                    amount:2
                }
            ];
        let result = temp.mergeBarcode(formattedTags);
        expect(result).toEqual(mergedBarcode);
    });
});

describe('getAmountItems',function(){
    it("should return amountItems from mergedBarcode ",function(){
        let  mergedBarcode =
            [
                {
                    barcode:'ITEM000000',
                    amount:2
                },
                {
                    barcode:'ITEM000002',
                    amount:2
                }
            ];
        let allItems =
        [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
            {
                barcode: 'ITEM000001',
                name: '苹果',
                unit: '斤',
                price: 5.50
            },
            {
                barcode: 'ITEM000002',
                name: '羽毛球',
                unit: '个',
                price: 1.00
            }
        ];
        let amountItems = [{
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            amount: 2
        },
            {
                barcode: 'ITEM000002',
                name: '羽毛球',
                unit: '个',
                price: 1.00,
                amount :2
            }
         ]   
    });
});