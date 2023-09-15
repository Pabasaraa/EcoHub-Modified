class reviewValidation {
  constructor(review) {
    this.postedBy = review.postedBy;
    this.postedOn = review.postedOn;
    this.reviewTitle = review.reviewTitle;
    this.reviewBody = review.reviewBody;
  }

  async validate() {
    if (!this.postedBy || !this.postedOn || !this.reviewTitle) {
      throw new Error("Some fields are missing!");
    }
  }

  getReview() {
    return this;
  }
}

export default reviewValidation;
