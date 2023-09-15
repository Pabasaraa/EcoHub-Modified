class SeminarValidation {
  constructor(seminar) {
    this.userId = seminar.body.userId;
    // this.username = item.body.username;
    this.seminarDate = seminar.body.seminarDate;
    this.seminarTime = seminar.body.seminarTime;
    this.seminarLocation = seminar.body.seminarLocation;
    this.seminarLocationDis = seminar.body.seminarLocationDis;
    this.seminarDescription = seminar.body.seminarDescription;

    
  }

  async validate() {
    if (
      !this.userId ||
      // !this.username ||
      !this.seminarDate ||
      !this.seminarTime ||
      !this.seminarLocation ||
      !this.seminarLocationDis ||
      !this.seminarDescription 
   
    ) {
      throw new Error("Some fields are missing!");
    }

    // if (this.itemImages.length === 0) {
    //   throw new Error("Item must have at least one image!");
    // }
  }

  getSeminar() {
    return this;
  }
}

export default SeminarValidation;
