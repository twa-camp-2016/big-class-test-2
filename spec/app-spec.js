"use strcit";
import {
  formatTag,
  mergeTag,
  getCartItems,
  loadAllItems,
  getSubTotalItems,
  calculateTotal,
  loadPromotions,
  getPromotionsTypeItems,
  getPromotionsSubTotalItems,
  calculatePromotionTotal,
  calculateSaving,
  getSummaryString
} from "../src/app";

describe("formatTag",function(){
  it("should return tags",function(){
    let tag = [
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
    let result = formatTag(tag);
    let expectResult = [
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000003',
        amount:2
      },
      {
        barcode:'ITEM000005',
        amount:1
      },
      {
        barcode:'ITEM000005',
        amount:1
      },{
        barcode:'ITEM000005',
        amount:1
      }
    ];
    expect(result).toEqual(expectResult);
  })
});

describe("mergeTags",function(){
  it("should return mergedTags",function(){
    let tags = [
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000001',
        amount:1
      },
      {
        barcode:'ITEM000003',
        amount:2
      },
      {
        barcode:'ITEM000005',
        amount:1
      },
      {
        barcode:'ITEM000005',
        amount:1
      },{
        barcode:'ITEM000005',
        amount:1
      }
    ];
    let result = mergeTag(tags);
    let expectResult = [
      {
        barcode:'ITEM000001',
        amount:5
      },
      {
        barcode:'ITEM000003',
        amount:2
      },
      {
        barcode:'ITEM000005',
        amount:3
      }
    ];
    expect(result).toEqual(expectResult);
  })
});

describe("getCartItems",function(){
  it("should return a cartItems",function(){
    let items = loadAllItems();
    let mergedItems = [
      {
        barcode:'ITEM000001',
        amount:5
      },
      {
        barcode:'ITEM000003',
        amount:2
      },
      {
        barcode:'ITEM000005',
        amount:3
      }
    ];
    let result = getCartItems(items,mergedItems);
    let expectResult = [
      {
        barcode:'ITEM000001',
        amount:5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode:'ITEM000003',
        amount:2,
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      {
        barcode:'ITEM000005',
        amount:3,
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
    ];
  })
});

describe("getSubTotalItems",function(){
  it("should return a subTotalItem",function(){
    let cartItems = [
      {
        barcode:'ITEM000001',
        amount:5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      {
        barcode:'ITEM000003',
        amount:2,
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      {
        barcode:'ITEM000005',
        amount:3,
        name: '方便面',
        unit: '袋',
        price: 4.50
      }
    ];
    let result = getSubTotalItems(cartItems);
    let expectResult = [
      {
        barcode:'ITEM000001',
        amount:5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        subTotal:15
      },
      {
        barcode:'ITEM000003',
        amount:2,
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        subTotal:30
      },
      {
        barcode:'ITEM000005',
        amount:3,
        name: '方便面',
        unit: '袋',
        price: 4.50,
        subTotal:13.5
      }
    ];
    expect(result).toEqual(expectResult);
  })
});

describe("calculateTotal",function(){
  it("should return total",function () {
    let subTotalItems = [
      {
        barcode:'ITEM000001',
        amount:5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        subTotal:15
      },
      {
        barcode:'ITEM000003',
        amount:2,
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        subTotal:30
      },
      {
        barcode:'ITEM000005',
        amount:3,
        name: '方便面',
        unit: '袋',
        price: 4.50,
        subTotal:13.5
      }
    ];
    let result = calculateTotal(subTotalItems);
    let expectResult = 58.5;
    expect(result).toEqual(expectResult);
  })
});

describe("getPromotionsTypeItems",function(){
  it("should return type",function () {
    let promotions = loadPromotions();
    let subTotalItems = [
      {
        barcode:'ITEM000001',
        amount:5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        subTotal:15
      },
      {
        barcode:'ITEM000003',
        amount:2,
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        subTotal:30
      },
      {
        barcode:'ITEM000005',
        amount:3,
        name: '方便面',
        unit: '袋',
        price: 4.50,
        subTotal:13.5
      }
    ];
    let result = getPromotionsTypeItems(promotions,subTotalItems);
    let expectResult = [
      {
        barcode:'ITEM000001',
        amount:5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        subTotal:15,
        type:'BUY_TWO_GET_ONE_FREE'
      },
      {
        barcode:'ITEM000003',
        amount:2,
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        subTotal:30,
        type:null
      },
      {
        barcode:'ITEM000005',
        amount:3,
        name: '方便面',
        unit: '袋',
        price: 4.50,
        subTotal:13.5,
        type:'BUY_TWO_GET_ONE_FREE'
      }
    ];
    expect(result).toEqual(expectResult)
  })
});

describe("getPromotionsSubTotalItems",function () {
  it("should return newSubtotal",function () {
    let promtionsTypeItems = [
      {
        barcode:'ITEM000001',
        amount:5,
        name: '雪碧',
        unit: '瓶',
        price: 3.00,
        subTotal:15,
        type:'BUY_TWO_GET_ONE_FREE'
      },
      {
        barcode:'ITEM000003',
        amount:2,
        name: '荔枝',
        unit: '斤',
        price: 15.00,
        subTotal:30,
        type:null
      },
      {
        barcode:'ITEM000005',
        amount:3,
        name: '方便面',
        unit: '袋',
        price: 4.50,
        subTotal:13.5,
        type:'BUY_TWO_GET_ONE_FREE'
      }
    ];
    let result = getPromotionsSubTotalItems(promtionsTypeItems);
    let expectResult = [
      { barcode: 'ITEM000001', amount: 5, name: '雪碧', unit: '瓶', price: 3, subTotal: 15, type: 'BUY_TWO_GET_ONE_FREE', PromotionsSubTotal: 12 },
      { barcode: 'ITEM000003', amount: 2, name: '荔枝', unit: '斤', price: 15, subTotal: 30, type: 'BUY_TWO_GET_ONE_FREE', PromotionsSubTotal: 30 },
      { barcode: 'ITEM000005', amount: 3, name: '方便面', unit: '袋', price: 4.5, subTotal: 13.5, type: 'BUY_TWO_GET_ONE_FREE', PromotionsSubTotal: 9 }
    ];
    expect(result).toEqual(expectResult);
  })

});

describe("calculatePromotionTotal",function(){
  it("should return total",function () {
    let getPromotionSubTotalItems =[
      { barcode: 'ITEM000001', amount: 5, name: '雪碧', unit: '瓶', price: 3, subTotal: 15, type: 'BUY_TWO_GET_ONE_FREE', PromotionsSubTotal: 12 },
      { barcode: 'ITEM000003', amount: 2, name: '荔枝', unit: '斤', price: 15, subTotal: 30, type: 'BUY_TWO_GET_ONE_FREE', PromotionsSubTotal: 30 },
      { barcode: 'ITEM000005', amount: 3, name: '方便面', unit: '袋', price: 4.5, subTotal: 13.5, type: 'BUY_TWO_GET_ONE_FREE', PromotionsSubTotal: 9 }
    ];
    let result = calculatePromotionTotal(getPromotionSubTotalItems);
    let expectResult = 51;
    expect(result).toEqual(expectResult)
  })
})
describe("calculateSaving",function(){
  it("should return saving",function () {
    let total = 58;
    let promotionsTotal = 51
    let result = calculateSaving(total,promotionsTotal);
    let expectResult = 7;
    expect(result).toEqual(expectResult)
  })
})
describe("getSummaryString",function(){
  it("should return saving",function () {
    let getPromotionSubTotalItems =  [
      { barcode: 'ITEM000001', amount: 5, name: '雪碧', unit: '瓶', price: 3, subTotal: 15, type: 'BUY_TWO_GET_ONE_FREE', PromotionsSubTotal: 12 },
      { barcode: 'ITEM000003', amount: 2, name: '荔枝', unit: '斤', price: 15, subTotal: 30, type: 'BUY_TWO_GET_ONE_FREE', PromotionsSubTotal: 30 },
      { barcode: 'ITEM000005', amount: 3, name: '方便面', unit: '袋', price: 4.5, subTotal: 13.5, type: 'BUY_TWO_GET_ONE_FREE', PromotionsSubTotal: 9 }
    ];
    let promotionsTotal = 51;
    let result = getSummaryString(getPromotionSubTotalItems,7,promotionsTotal);
    let expectResult = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.00(元)
**********************`.trim();
    expect(result).toEqual(expectResult)
  })
})