class Receipt {
  constructor() {
    this.receipt = {};
  }

  withRetailer(retailer) {
    this.receipt.retailer = retailer;
    return this;
  }

  withPurchaseDate(purchaseDate) {
    this.receipt.purchaseDate = purchaseDate;
    return this;
  }

  withPurchaseTime(purchaseTime) {
    this.receipt.purchaseTime = purchaseTime;
    return this;
  }

  withTotal(total) {
    this.receipt.total = total;
    return this;
  }

  withItems(items) {
    this.receipt.items = items;
    return this;
  }

  build() {
    return this.receipt;
  }
}

module.exports = Receipt;
