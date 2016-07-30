//noinspection JSUnresolvedFunction
let obj=require('../src/app.js');
//noinspection JSUnresolvedFunction
let fix=require('./fixture.js');

describe('formatTags',()=>{
    it('return formattedTags',()=>{
        let tags=[
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'];
        let formattedTags=[
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000003', amount:2},
            {barcode:'ITEM000005', amount:1},
            {barcode:'ITEM000005', amount:1},
            {barcode:'ITEM000005', amount:1}
        ];
        expect(obj.formatTags(tags)).toEqual(formattedTags);
    });
});
describe('getAmount',()=>{
    it('return barcodesAmount',()=>{
        let formattedTags=[
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000001', amount:1},
            {barcode:'ITEM000003', amount:2},
            {barcode:'ITEM000005', amount:1},
            {barcode:'ITEM000005', amount:1},
            {barcode:'ITEM000005', amount:1}
        ];
        let barcodesAmount=[
            {barcode:'ITEM000001', amount:5},
            {barcode:'ITEM000003', amount:2},
            {barcode:'ITEM000005', amount:3},
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
describe('getItemsAmount',()=>{
    it('return itemsAmount',()=>{
        let barcodesAmount=[
            {barcode:'ITEM000001', amount:5},
            {barcode:'ITEM000003', amount:2},
            {barcode:'ITEM000005', amount:3},
        ];
        let items=[
            {barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3.00},
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
            {barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.50},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00},
            {barcode: 'ITEM000004', name: '电池', unit: '个', price: 2.00},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50}
        ];
        let itemsAmount=[
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00,amount:5},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00,amount:2},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50,amount:3}
        ];
        expect(obj.getItemsAmount(barcodesAmount,items)).toEqual(itemsAmount);
    });
});





