'use strict';
/*global require*/
const  obj2 = require("../src/app");
describe("formatItem",function () {
    it("should format Item ",function () {
        let items = ['ITEM000003-2'];
        let result = obj2.formatItem(items);
        expect(result).toEqual([{barcode:'ITEM000003',
                                 count:2}]);
    });
});
describe("mergeItems",function () {
    it("should merge Item ",function () {
        let formattedItems = [{barcode:'ITEM000001',count:1},{barcode:'ITEM000001',count:1}];
        let result = obj2.mergeItems(formattedItems);
        expect(result).toEqual([{barcode:'ITEM000001',
                                 count:2}]);
    });
});
describe("matchItems",function () {
    it("should match information of item",function () {
        let mergedItems = [{barcode:'ITEM000003',count:2}];
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
        let result = obj2.matchItems(mergedItems, allItems);
        expect(result).toEqual([{barcode: 'ITEM000003',
                                 name: '荔枝',
                                 unit: '斤',
                                 price: 15.00,
                                 count:2}]);
    });
});
describe("calculateOriginSubtotal",function () {
    it("should calculate originSubtotal of cartItem ",function () {
        let cartItems = [{barcode:'ITEM000000',
                         name: '可口可乐',
                         unit: '瓶',
                         price: 3.00,
                         count:3}];
        let result = obj2.calculateOriginSubtotal(cartItems);
        expect(result).toEqual([{barcode:'ITEM000000',
                                 name: '可口可乐',
                                 unit: '瓶',
                                 price: 3.00,
                                 count:3,
                                 originSubtotal:9.00}]);
    });
});
describe("matchPromotions",function () {
    it("should match Promotions of cartItem ",function () {
        let originSubtotalList = [{barcode:'ITEM000000',
                                   name: '可口可乐',
                                   unit: '瓶',
                                   price: 3.00,
                                   count:3,
                                   originSubtotal:9.00}];
        let allPromotions = [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: [
                    'ITEM000000',
                    'ITEM000001',
                    'ITEM000005'
                ]
            }
        ];
        let result = obj2.matchPromotions(originSubtotalList,allPromotions);
        expect(result).toEqual([{barcode:'ITEM000000',
                                 name: '可口可乐',
                                 unit: '瓶',
                                 price: 3.00,
                                 count:3,
                                 originSubtotal:9.00,
                                 type:'BUY_TWO_GET_ONE_FREE'}]);
    });
});
describe("calculateSaving",function () {
    it("should calculate saving of cartItem ",function () {
        let newSubtotalList = [{barcode:'ITEM000000',
                                name: '可口可乐',
                                unit: '瓶',
                                price: 3.00,
                                count:3,
                                originSubtotal:9.00,
                                type:'BUY_TWO_GET_ONE_FREE'}];
        let result = obj2.calculateSaving(newSubtotalList);
        expect(result).toEqual([{barcode:'ITEM000000',
                                 name: '可口可乐',
                                 unit: '瓶',
                                 price: 3.00,
                                 count:3,
                                 originSubtotal:9.00,
                                 type:'BUY_TWO_GET_ONE_FREE',
                                 saving:3.00}]);
    });
});
describe("calculateSavingTotal",function () {
    it("should calculate savingTotal of cartItems ",function () {
        let savingList = [{barcode:'ITEM000000',
                            name: '可口可乐',
                            unit: '瓶',
                            price: 3.00,
                            count:3,
                            originSubtotal:9.00,
                            type:'BUY_TWO_GET_ONE_FREE',
                            saving:3.00},
                        {barcode:'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        price: 3.00,
                        count:5,
                        originSubtotal:15.00,
                        type:'BUY_TWO_GET_ONE_FREE',
                        saving:3.00}];
        let result = obj2.calculateSavingTotal(savingList);
        expect(result).toEqual(6.00);
    });
});
describe("calculateSubtotal",function () {
    it("should calculate subtotal of cartItem ",function () {
        let savingList = [{barcode:'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            count:3,
            originSubtotal:9.00,
            type:'BUY_TWO_GET_ONE_FREE',
            saving:3.00},
            {barcode:'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count:5,
                originSubtotal:15.00,
                type:'BUY_TWO_GET_ONE_FREE',
                saving:3.00}];
        let result = obj2.calculateSubtotal(savingList);
        expect(result).toEqual([{barcode:'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            count:3,
            originSubtotal:9.00,
            type:'BUY_TWO_GET_ONE_FREE',
            saving:3.00,
            subtotal:6.00},
            {barcode:'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count:5,
                originSubtotal:15.00,
                type:'BUY_TWO_GET_ONE_FREE',
                saving:3.00,
                subtotal:12.00}]);
    });
});
describe("calculateTotal",function () {
    it("should calculate total of cartItems ",function () {
        let finalSubtotalList = [{barcode:'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            count:3,
            originSubtotal:9.00,
            type:'BUY_TWO_GET_ONE_FREE',
            saving:3.00,
            subtotal:6.00},
            {barcode:'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count:5,
                originSubtotal:15.00,
                type:'BUY_TWO_GET_ONE_FREE',
                saving:3.00,
                subtotal:12.00}];
        let result = obj2.calculateTotal(finalSubtotalList);
        expect(result).toEqual(18.00);
    });
});
describe("print",function () {
    it("should print details of cartItems ",function () {
        let finalSubtotalList = [{barcode:'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            count:3,
            originSubtotal:9.00,
            type:'BUY_TWO_GET_ONE_FREE',
            saving:3.00,
            subtotal:6.00},
            {barcode:'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count:5,
                originSubtotal:15.00,
                type:'BUY_TWO_GET_ONE_FREE',
                saving:3.00,
                subtotal:12.00}];
        let savingTotal = 6.00;
        let total = 18.00;
        let result = obj2.print(finalSubtotalList,savingTotal,total);
        expect(result).toEqual("名称:可口可乐，数量:3瓶，单价:3.00(元)，小计:6.00(元)"+"\n"+
            "名称:雪碧，数量:5瓶，单价:3.00(元)，小计:12.00(元)"+"\n"+"总计:18.00(元)"+"\n"+
            "节省:6.00(元)");
    });
});
describe("printReceipt",function () {
    it("should print final information of cartItems ",function () {
        let items = ['ITEM000000','ITEM000000','ITEM000000','ITEM000001','ITEM000001','ITEM000001','ITEM000001','ITEM000001'];
        let result = obj2.printReceipt(items);
        expect(result).toEqual("名称:可口可乐，数量:3瓶，单价:3.00(元)，小计:6.00(元)"+"\n"+
            "名称:雪碧，数量:5瓶，单价:3.00(元)，小计:12.00(元)"+"\n"+"总计:18.00(元)"+"\n"+
            "节省:6.00(元)");
    });
});


