'use strict';
const name = require('./fixture.js');

describe("parseTags", function(){
    it("two parts from barcode ", function(){
        let input =['ITEM000001', 'ITEM000003-2'];
        let result = parseTags(input);
        let output = [{barcode:"ITEM000001",amount:1.5},{barcode:"ITEM000003",amount:2}];
        expect(result).toEqual(output);
    });

});
describe("mergeBarcode", function(){
    it("mergeBarcode", function(){
        let input = [
            {barcode:"ITEM000001",amount:1.5},
            {barcode:"ITEM000001",amount:1.5},
            {barcode:"ITEM000003",amount:2}];
        let result = mergeBarcode(input);
        let output= [{barcode:"ITEM000001",amount:3},
                     {barcode:"ITEM000003",amount:2}];
        expect(result).toEqual(output);
    })
});

describe("getCartItems",function(){
    it("getCartItems",function(){
        let allItems = name.loadAllItems;
        let mergedBarcode =[
            {
                barcode: 'ITEM000000',
                amount:3
            },
            {
                barcode: 'ITEM000001',
                amount:2
            }
        ];

        let result = getCartItems(mergedBarcode, allItems);
        let cartItems = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:3
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:2
            }
        ];
        expect(result).toEqual(cartItems);
    })

});

describe("getCartItemsType",function(){
    it("getCartItemsType", function(){
        let PromotionItems = name.loadPromotions();
        let cartItems= [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:3
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:2
            }
        ];
        let result = getCartItemsAmountType(PromotionItems,cartItems);
        let CartItemsType = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:2,
                type:'BUY_TWO_GET_ONE_FREE'
            },
            {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'BUY_TWO_GET_ONE_FREE'
            }

        ];
        expect(result).toEqual(CartItemsType);
    })
})

describe("getPromotedItems",function(){
    it("getPromotedMoney-amount", function (){
        let CartItemsAmountType = [
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'BUY_TWO_GIVE_ONE'
            },
            {
                barcode: 'ITEM000002',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'OTHER_PROMOTION'
            }]
        let result = getPromotedItems(CartItemsAmountType);
        let PromotedItems=[
            {
                barcode: 'ITEM000000',
                name: '可口可乐',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'BUY_TWO_GIVE_ONE',
                promotedAmount:2,
                promotedPrice:3
            },
            {
                barcode: 'ITEM000002',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                amount:3,
                type:'OTHER_PROMOTION',
                promotedAmount:3,
                promotedPrice:0
            }

        ];
        expect(result).toEqual(PromotedItems);
    })

})

