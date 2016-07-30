//noinspection JSUnresolvedFunction
let obj=require('../src/app.js');

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
