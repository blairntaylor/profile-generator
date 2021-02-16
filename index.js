// file system and inquirer packages needed for this app
const fs = require("fs");
const inquirer = require("inquirer");

//prompts for team profile info
function
    init(){
        //use class to capture key value pairs

        //do i make three separate objects: manager, engineer, intern?
    class Manager {
        constructor(name, id, email, github, addemployee){
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
        this.addemployee = addemployee;
        }
    }
    printStats(){
        //console log information
        console.log(`${this.name, this.id, this.email, this.github}`);
    };
    inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
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
            type: "input",
            message: "Please input the employee office number.",
            name: "email",
        },
        {
            type: "list",
            message: "Please input the employee office number.",
            name: "email",
        },
    ])
}