//manager(name, id, email, role, number)

const Employee = require("./employee");

class Manager extends Employee {
  constructor(name, id, email, number) {
    super(name, id, email);
    this.number = number;
    this.role = "Manager";
  }
  getRole() {
    return this.role;
  }
  getNumber() {
    return this.number;
  }
}

module.exports = Manager;
