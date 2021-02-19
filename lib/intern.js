//intern(name, id, email, role, school)

const Employee = require("./employee");

class Intern extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.school = school;
    this.role = "Intern";
  }
  getRole() {
    return this.role;
  }
  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
