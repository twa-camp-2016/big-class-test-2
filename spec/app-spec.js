//noinspection JSUnresolvedFunction
let obj=require('../src/app.js');
//noinspection JSUnresolvedFunction
let fix=require('./fixture.js');

describe('formatTags',()=>{
    it('return formattedTags',()=>{
        let tags=['ITEM01','ITEM01','ITEM01','ITEM02-2','ITEM03-2','ITEM03'];
        let formattedTags=[
            {barcode:'ITEM01', amount:1},
            {barcode:'ITEM01', amount:1},
            {barcode:'ITEM01', amount:1},
            {barcode:'ITEM02', amount:2},
            {barcode:'ITEM03', amount:2},
            {barcode:'ITEM03', amount:1},
        ];
        expect(obj.formatTags(tags)).toEqual(formattedTags);
    });
});
describe('getAmount',()=>{
    it('return barcodesAmount',()=>{
        let formattedTags=[
            {barcode:'ITEM01', amount:1},
            {barcode:'ITEM01', amount:1},
            {barcode:'ITEM01', amount:1},
            {barcode:'ITEM02', amount:2},
            {barcode:'ITEM03', amount:2},
            {barcode:'ITEM03', amount:1},
        ];
        let barcodesAmount=[
            {barcode:'ITEM01', amount:3},
            {barcode:'ITEM02', amount:2},
            {barcode:'ITEM03', amount:3},
        ];
        expect(obj.getAmount(formattedTags)).toEqual(barcodesAmount);
    });
});
describe('loadAllItems',()=>{
    it('return items',()=>{
        let items=[
            {barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3.00},
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
            {barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.50},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00},
            {barcode: 'ITEM000004', name: '电池', unit: '个', price: 2.00},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50}
        ];
        expect(fix.loadAllItems()).toEqual(items);
    });
});






