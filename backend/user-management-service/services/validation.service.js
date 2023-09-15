import argon2 from "argon2";
import validator from "validator";

class UserValidation {
  constructor(user) {
    this.username = user.username;
    this.name = user.name;
    this.password = user.password;
    this.repeatPassword = user.repeatPassword;
    this.email = user.email;
    // this.role = user.role;
  }

  async validate() {
    if (
      !this.username ||
      !this.name ||
      !this.password ||
      !this.repeatPassword ||
      !this.email 
      // !this.role
    ) {
      throw new Error("Some fields are missing!");
    }

    if (this.password.trim().length < 6) {
      throw new Error("Password must be at least 6 characters long!");
    }

    if (this.password.trim() !== this.repeatPassword.trim()) {
      throw new Error("Passwords do not match!");
    }

    if (!validator.isEmail(this.email)) {
      throw new Error("Email is not valid!");
    }

    // if (
    //   this.role !== "user" ||
    //   this.role !== "admin"
      
    // ) {
    //   throw new Error("Role is not valid!");
    // }
  }

  async hashPassword() {
    try {
      this.password = await argon2.hash(this.password);
    } catch (error) {
      throw new Error("Error while hashing password: " + error);
    }
  }

  getUser() {
    return this;
  }
}

export default UserValidation;
