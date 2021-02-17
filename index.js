// file system and inquirer packages needed for this app
const fs = require("fs");
const inquirer = require("inquirer");
const jest = require("jest");

let finalTeam = [];

const genQuestions = [
  {
    type: "input",
    message: "What is the name?",
    name: "name",
  },
  {
    type: "input",
    message: "Please input the employee ID.",
    name: "id",
  },
  {
    type: "input",
    message: "Please input the employee email address.",
    name: "email",
  },
];

//create initiate function
function init() {
  addManager();

  //constructor function to create objects from properties collected
  //QUESTION: 3 separate class or 3 separate constructor objects for the team member type?
  class Manager {
    constructor(name, id, email, phone) {
      this.name = name;
      this.id = id;
      this.email = email;
      this.phone = phone; //phone
    }
  }
  class Engineer {
    constructor(name, id, email, github) {
      this.name = name;
      this.id = id;
      this.email = email;
      this.github = github; //github
    }
  }
  class Intern {
    constructor(name, id, email, school) {
      this.name = name;
      this.id = id;
      this.email = email;
      this.school = school; //school
    }
  }
  class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
  }

  function addManager() {
    //start the app with questions about the manager
    inquirer
      .prompt([
        //spread operator to include general questions
        ...genQuestions,
        {
          type: "input",
          message: "Please input the manager office number as xxx-xxx-xxxx.",
          name: "phone",
        },
        {
          type: "list",
          message: "Confirm role.",
          name: "role",
          choices: ["Manager", "Engineer", "Intern", "Employee"],
        },
      ])
      //take manager data and push into an array
      .then(function (data) {
        const name = data.name;
        const id = data.id;
        const email = data.email;
        const phone = data.phone;
        const member = new Manager(name, id, email, phone);
        finalTeam.push(member);
        console.log(finalTeam);
        //call next function
        addTeamMember(data.role);
      });
    // if the user wants to add an engineer or intern asks another question or exit
    function addTeamMember(role) {
      inquirer
        .prompt([
          {
            type: "list",
            message: "Would you like to add another employee?",
            name: "addmember",
            choices: ["Engineer", "Intern", "Exit"],
          },
        ])
        .then(function (answer) {
          let newMember;
          if (answer.addmember === "Engineer") {
            console.log("You picked engineer.");
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter the github username.",
                  name: "github",
                },
                ...genQuestions,
              ])
              .then(function (answers) {
                console.log(answers);
                newMember = new Engineer(
                  answers.name,
                  answers.id,
                  answers.email,
                  answers.github
                );
                finalTeam.push(newMember);
                addTeamMember();
              });
          }
          if (answer.addmember === "Intern") {
            console.log("You picked intern.");
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "Enter school name.",
                  name: "school",
                },
                ...genQuestions,
              ])
              .then(function (answers) {
                console.log(answers);
                newMember = new Intern(
                  answers.name,
                  answers.id,
                  answers.email,
                  answers.school
                );
                finalTeam.push(newMember);
                addTeamMember();
              });
          }
          if (answer.addmember === "Exit") {
            console.log("You have exited program.");
            console.log(finalTeam);
            writeHtml();
          }
        });
    }
  }

  function writeHtml() {
    //template literals
    //make simple HTML in index.html as the template
  }

  //Create the HTML function
}
init();
