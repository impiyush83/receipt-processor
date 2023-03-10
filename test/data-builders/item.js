class Item {
  constructor() {
    this.item = {};
  }

  withShortDescription(shortDescription) {
    this.item.shortDescription = shortDescription;
    return this;
  }

  withPrice(price) {
    this.item.price = price;
    return this;
  }

  build() {
    return this.item;
  }
}

module.exports = Item;
