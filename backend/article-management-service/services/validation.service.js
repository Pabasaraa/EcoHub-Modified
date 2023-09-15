class ArticleValidation {
    constructor(article) {
      this.adminId = article.body.adminId;
      this.articleTitle = article.body.articleTitle;
      this.articleAuthor = article.body.articleAuthor;
      this.articleDescription = article.body.articleDescription;
      this.articleContent = article.body.articleContent;
      this.dateOfPublication = article.body.dateOfPublication;
      
    }
  
    async validate() {
      if (
        !this.adminId ||
        !this.articleTitle ||
        !this.articleAuthor ||
        !this.articleDescription ||
        !this.articleContent ||
        !this.dateOfPublication
      ) {
        throw new Error("Some fields are missing!");
      }
  
    }
  
    getArticle() {
      return this;
    }
  }
  
  export default ArticleValidation;
  