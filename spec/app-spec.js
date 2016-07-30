'use strict';
const func = require('../src/app.js');

describe("splitBarcodes test",function () {
    it("splitedBarcodes is right",function () {
       let barcodes =  [
           'ITEM000001',
           'ITEM000001',
           'ITEM000001',
           'ITEM000001',
           'ITEM000001',
           'ITEM000003-2',
           'ITEM000005',
           'ITEM000005',
           'ITEM000005'
       ];
       let splitedBarcodes = [{barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000003',amount:2},
           {barcode:'ITEM000005',amount:1},
           {barcode:'ITEM000005',amount:1},
           {barcode:'ITEM000005',amount:1}];
        expect(func.splitBarcodes(barcodes)).toEqual(splitedBarcodes);
    });
});

describe("mergeBarcode test ",function () {
   it("mergedBarcodes is right ",function () {
      let splitedBarcodes = [{barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000001',amount:1},
           {barcode:'ITEM000003',amount:2},
           {barcode:'ITEM000005',amount:1},
           {barcode:'ITEM000005',amount:1},
           {barcode:'ITEM000005',amount:1}];

       let mergedBarcodes = [{barcode:'ITEM000001',amount:5},
           {barcode:'ITEM000003',amount:2},
           {barcode:'ITEM000005',amount:3}];
       expect(func.mergeBarcodes(splitedBarcodes)).toEqual(mergedBarcodes);
   }); 
});

describe("matchItem test ",function () {
   it("cartItems is right",function () {
       let mergedBarcodes = [{barcode:'ITEM000001',amount:5},
           {barcode:'ITEM000003',amount:2},
           {barcode:'ITEM000005',amount:3}];
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
       
       let cartItems = [{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00,amount:5},
           {barcode:'ITEM000003',name:'荔枝',unit:'斤',price:15.00,amount:2},
           {barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50,amount:3}];
       
       expect(func.matchItem(mergedBarcodes,allItems)).toEqual(cartItems);
   }); 
});

describe("matchPromot test",function () {
   it("itemsInfo is right ",function () {
       let cartItems = [{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00,amount:5},
           {barcode:'ITEM000003',name:'荔枝',unit:'斤',price:15.00,amount:2},
           {barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50,amount:3}];
       let promotions = [
           {
               type: 'BUY_TWO_GET_ONE_FREE',
               barcodes: [
                   'ITEM000000',
                   'ITEM000001',
                   'ITEM000005'
               ]}];
       
       let itemsInfo = [{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00,amount:5,type:'BUY_TWO_GET_ONE_FREE'},
           {barcode:'ITEM000003',name:'荔枝',unit:'斤',price:15.00,amount:2,type:'-1'},
           {barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50,amount:3,type:'BUY_TWO_GET_ONE_FREE'}];
       
       expect(func.matchPromot(cartItems,promotions)).toEqual(itemsInfo);
   }); 
});

describe("caculateUncutSubtotal test",function () {
   it("uncuttedSubtotal is right ",function () {
       let itemsInfo = [{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00,amount:5,type:'BUY_TWO_GET_ONE_FREE'},
           {barcode:'ITEM000003',name:'荔枝',unit:'斤',price:15.00,amount:2,type:'-1'},
           {barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50,amount:3,type:'BUY_TWO_GET_ONE_FREE'}];
       let uncuttedSubtotal = [{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00,amount:5,type:'BUY_TWO_GET_ONE_FREE',uncuttedSubtotal:15.00},
           {barcode:'ITEM000003',name:'荔枝',unit:'斤',price:15.00,amount:2,type:'-1',uncuttedSubtotal:30.00},
           {barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50,amount:3,type:'BUY_TWO_GET_ONE_FREE',uncuttedSubtotal:13.5}];
       expect(func.caculateUncutSubtotal(itemsInfo)).toEqual(uncuttedSubtotal);
   }); 
});

describe("caculateUncut total",function () {
   it('uncuttedTotal is right ',function () {
      let  uncuttedSubtotal = [{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00,amount:5,type:'BUY_TWO_GET_ONE_FREE',uncuttedSubtotal:15.00},
          {barcode:'ITEM000003',name:'荔枝',unit:'斤',price:15.00,amount:2,type:'-1',uncuttedSubtotal:30.00},
          {barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50,amount:3,type:'BUY_TWO_GET_ONE_FREE',uncuttedSubtotal:13.5}];
       let uncuttedTotal = 58.5;
       expect(func.caculateUncutTotal(uncuttedSubtotal)).toBe(uncuttedTotal);
   }); 
});
