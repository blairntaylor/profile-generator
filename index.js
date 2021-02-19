// file system and inquirer packages needed for this app
const fs = require("fs");
const { get } = require("http");
const inquirer = require("inquirer");
const jest = require("jest");

const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

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
  {
    type: "list",
    message: "Confirm role.",
    name: "role",
    choices: ["Manager", "Engineer", "Intern", "Employee"],
  },
];

//create initiate function
function init() {
  addManager();

  //constructor function to create objects from properties collected
  //QUESTION: 3 separate class or 3 separate constructor objects for the team member type?
  class Manager {
    constructor(name, role, id, email, phone) {
      this.name = name;
      this.role = role;
      this.id = id;
      this.email = email;
      this.phone = phone; //phone
    }
  }
  class Engineer {
    constructor(name, role, id, email, github) {
      this.name = name;
      this.role = role;
      this.id = id;
      this.email = email;
      this.github = github; //github
    }
  }
  class Intern {
    constructor(name, role, id, email, school) {
      this.name = name;
      this.role = role;
      this.id = id;
      this.email = email;
      this.school = school; //school
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
      ])
      //take manager data and push into an array
      .then(function (data) {
        const name = data.name;
        const role = data.role;
        const id = data.id;
        const email = data.email;
        const phone = data.phone;
        const member = new Manager(name, role, id, email, phone);
        finalTeam.push(member);
        //call next function
        addTeamMember(data.role);
      });
    // if the user wants to add an engineer or intern asks another question or exit
    function addTeamMember(role) {
      inquirer
        .prompt([
          {
            type: "list",
            message: "Would you like to add another employee or exit?",
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
              .then(function (answer) {
                const name = answer.name;
                const role = answer.role;
                const id = answer.id;
                const email = answer.email;
                const github = answer.github;
                const newMember = new Engineer(name, role, id, email, github);
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
              .then(function (answer) {
                const name = answer.name;
                const role = answer.role;
                const id = answer.id;
                const email = answer.email;
                const school = answer.school;
                const newMember = new Intern(name, role, id, email, school);
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
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Team Profile Generator</title>
          <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
          <link rel="stylesheet" href="style.css">
      </head>
      <body>
          <header>My Team</header>`;
    fs.writeFile("team.html", html, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Writing html.");
    });

    function addManager(member) {
      return new Promise(function (resolve, reject) {
        const name = member.getName();
      });
    }
    `<div class="content">
  <div id="top-row">
      <div class="card" style="width: 18rem;">
        <div class="card-body p-3 mb-2 bg-primary text-white">
          <h5 class="card-title">${name}</h5>
          <h5 class="card-text">${role}</h5>
        </div>
        <div class="card-body">
          <div class="card" style="width: 15rem;">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email: ${email}</li>
              <li class="list-group-item">OfficeNumber: ${phone}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body p-3 mb-2 bg-primary text-white">
          <h5 class="card-title">${name}</h5>
          <h5 class="card-text">${role}</h5>
        </div>
        <div class="card-body">
          <div class="card" style="width: 15rem;">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email: ${email}</li>
              <li class="list-group-item">GitHub: ${github}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card" style="width: 18rem;">
        <div class="card-body p-3 mb-2 bg-primary text-white">
          <h5 class="card-title">${name}</h5>
          <h5 class="card-text">${role}</h5>
        </div>
        <div class="card-body">
          <div class="card" style="width: 15rem;">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email: ${email}</li>
              <li class="list-group-item">GitHub: ${github}</li>
            </ul>
          </div>
        </div>
      </div>
  </div>
<div id ="bottom-row">
  <div class="card" style="width: 18rem;">
    <div class="card-body p-3 mb-2 bg-primary text-white">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-text">${role}</h5>
    </div>
    <div class="card-body">
      <div class="card" style="width: 15rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email: ${email}</li>
          <li class="list-group-item">GitHub: ${github}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="card" style="width: 18rem;">
    <div class="card-body p-3 mb-2 bg-primary text-white">
      <h5 class="card-title">${name}</h5>
      <h5 class="card-text">${role}</h5>
    </div>
    <div class="card-body p-3 mb-2 bg-light text-dark">
      <div class="card" style="width: 15rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email: ${email}</li>
          <li class="list-group-item">School: ${school}</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
</body>
</html>`;
  }

  //Create the HTML function
}
init();
