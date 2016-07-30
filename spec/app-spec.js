'use strict';
const fixture=('./fixture');
const app=require('../src/app');
describe('format barcode', function () {
    it('get formatted barcode', function () {
        let tags = [
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000000',
            'ITEM000002-2',
            'ITEM000006',
            'ITEM000006',
            'ITEM000006'
        ];
        let expected = [{
            barcode: 'ITEM000000',
            amount: 0
        }, {
            barcode: 'ITEM000000',
            amount: 0
        },{
            barcode: 'ITEM000000',
            amount: 0
        },{
            barcode: 'ITEM000000',
            amount: 0
        },{
            barcode: 'ITEM000000',
            amount: 0
        },{
            barcode: 'ITEM000002',
            amount: 2
        }, {
            barcode: 'ITEM000006',
            amount: 0
        },{
            barcode: 'ITEM000006',
            amount: 0
        },{
            barcode: 'ITEM000006',
            amount: 0
        }
        ];
        expect(app.formatBarcode(tags)).toEqual(expected);
    });
});
describe('merBarcode',function () {
    it('get the only barcode',function () {
        let barcode=[{
            barcode: 'ITEM000000',
            amount: 0
        }, {
            barcode: 'ITEM000000',
            amount: 0
        },{
            barcode: 'ITEM000000',
            amount: 0
        },{
            barcode: 'ITEM000000',
            amount: 0
        },{
            barcode: 'ITEM000000',
            amount: 0
        },{
            barcode: 'ITEM000002',
            amount: 2
        }, {
            barcode: 'ITEM000006',
            amount: 0
        },{
            barcode: 'ITEM000006',
            amount: 0
        },{
            barcode: 'ITEM000006',
            amount: 0
        }];
        let expected=[{
            barcode: 'ITEM000000',
            amount: 5
        },{
            barcode: 'ITEM000002',
            amount: 2
        }, {
            barcode: 'ITEM000006',
            amount: 3
        }];
        expect(app.mergerBarcode(barcode)).toEqual(expected);
    });
});
describe('get cartItems',function () {
    it('all cartItems',function () {
        let barcodeItems=[{
            barcode: 'ITEM000000',
            amount: 5
        },{
            barcode: 'ITEM000002',
            amount: 2
        }, {
            barcode: 'ITEM000006',
            amount: 3
        }];
        let expected=[]
        
    })
    
})