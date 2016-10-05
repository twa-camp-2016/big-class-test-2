//noinspection JSUnresolvedFunction
let obj = require('../src/app.js');
//noinspection JSUnresolvedFunction
let fix = require('./fixture.js');

describe('formatTags', ()=> {
    it('return formattedTags', ()=> {
        let tags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'];
        let formattedTags = [
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1}
        ];
        expect(obj.formatTags(tags)).toEqual(formattedTags);
    });
});
describe('getAmount', ()=> {
    it('return barcodesAmount', ()=> {
        let formattedTags = [
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1}
        ];
        let barcodesAmount = [
            {barcode: 'ITEM000001', amount: 5},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 3},
        ];
        expect(obj.getAmount(formattedTags)).toEqual(barcodesAmount);
    });
});
describe('loadAllItems', ()=> {
    it('return items', ()=> {
        let items = [
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
describe('getItemsAmount', ()=> {
    it('return itemsAmount', ()=> {
        let barcodesAmount = [
            {barcode: 'ITEM000001', amount: 5},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 3},
        ];
        let items = [
            {barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3.00},
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00},
            {barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.50},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00},
            {barcode: 'ITEM000004', name: '电池', unit: '个', price: 2.00},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50}
        ];
        let itemsAmount = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 5},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 2},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 3}
        ];
        expect(obj.getItemsAmount(barcodesAmount, items)).toEqual(itemsAmount);
    });
});
describe('getSubtotal', ()=> {
    it('return itemsSubtotal', ()=> {
        let itemsAmount = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 5},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 2},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 3}
        ];
        let itemsSubtotal = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 5, subtotal: 15},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 2, subtotal: 30},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 3, subtotal: 13.5}
        ];
        expect(obj.getSubtotal(itemsAmount)).toEqual(itemsSubtotal);
    });
});
describe('loadPromotions', ()=> {
    it('return promotions', ()=> {
        let promotions = [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: ['ITEM000000', 'ITEM000001', 'ITEM000005']
            }
        ];
        expect(fix.loadPromotions()).toEqual(promotions);
    });
});
describe('getSubtotalPromotion', ()=> {
    it('return itemsSubtotalPromotion', ()=> {
        let promotions = [
            {
                type: 'BUY_TWO_GET_ONE_FREE',
                barcodes: ['ITEM000000', 'ITEM000001', 'ITEM000005']
            }
        ];
        let itemsSubtotal = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 5, subtotal: 15},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 2, subtotal: 30},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 3, subtotal: 13.5}
        ];
        let itemsSubtotalPromotion = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 5, subtotal: 12},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 2, subtotal: 30},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 3, subtotal: 9}
        ];
        expect(obj.getSubtotalPromotion(promotions, itemsSubtotal)).toEqual(itemsSubtotalPromotion);
    });
});
describe('getReceipt', ()=> {
    it('return receipt', ()=> {
        let itemsSubtotalPromotion = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 5, subtotal: 12},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 2, subtotal: 30},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 3, subtotal: 9}
        ];
        let itemsSubtotal = [
            {barcode: 'ITEM000001', name: '雪碧', unit: '瓶', price: 3.00, amount: 5, subtotal: 15},
            {barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15.00, amount: 2, subtotal: 30},
            {barcode: 'ITEM000005', name: '方便面', unit: '袋', price: 4.50, amount: 3, subtotal: 13.5}
        ];
        let receipt = `
***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;
        expect(obj.getReceipt(itemsSubtotalPromotion, itemsSubtotal)).toEqual(receipt);
    });
});
describe('printReceipt', ()=> {
    it('return receipt', ()=> {
        let tags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'];
        let receipt = `
***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;
        expect(obj.printReceipt(tags)).toEqual(receipt);
    });
});







