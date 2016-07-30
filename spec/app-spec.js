"use strict"

describe('formateBarcode', function () {
    it('should return formatedBarcodes', function () {
        let tags = [
            'ITEM000001',
            'ITEM000003-2'
        ];
        let expected = [
            {
                barcode: 'ITEM000001',
                count: 1
            }, {
                barcode: 'ITEM000003',
                count: 2
            }
        ];
    });
});
