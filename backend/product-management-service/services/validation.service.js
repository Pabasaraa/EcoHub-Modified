class ProductValidation {
  constructor(product) {
    this.adminId = product.body.adminId;
    this.productName = product.body.productName;
    this.productDescription = product.body.productDescription;
    this.productPrice = product.body.productPrice;
    this.productCategory = product.body.productCategory;
    this.productImages = product.files.map((file) => file.buffer);
  }

  async validate() {
    if (
      !this.adminId ||
      !this.productName ||
      !this.productDescription ||
      !this.productPrice ||
      !this.productCategory
    ) {
      throw new Error("Some fields are missing!");
    }

    if (this.productImages.length === 0) {
      throw new Error("Item must have at least one image!");
    }
  }

  getProduct() {
    return this;
  }
}

export default ProductValidation;
