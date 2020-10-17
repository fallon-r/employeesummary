const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Declare team as empty ​
let team = [];

if (require.main === module) {
    addMember();
};


function addMember() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Please enter the employee's name."
            },
            {
                type: "rawlist",
                name: "role",
                message: "What is their role?",
                choices: ["Manager", "Engineer", "Intern"],
                default: "Manager",
                loop: true
            },
            {
                type: "number",
                name: "id",
                message: "Please enter an ID number."
            },
            {
                type: "input",
                name: "email",
                message: "Please enter the employee's email address."
            }
        ])
        .then(answers => {

            switch (answers.role) {
                case "Manager":
                    info = "Office number";
                    break;
                case "Engineer":
                    info = "Github username";
                    break;
                case "Intern":
                    info = "School name";
                    break;
            };

            inquirer
                .prompt([
                    {
                        name: "additionalInfo",
                        message: `Please enter employee's ${info}`
                    },
                    {
                        type: "confirm",
                        name: "addEmployee",
                        message: "Would you like to add more employees?"
                    }

                ])
                .then(data => {
                    switch (answers.role) {
                        case "Manager":
                            obj = new Manager(answers.name, answers.id, answers.email, data.additionalInfo);

                            break;
                        case "Engineer":
                            info = "Github username";
                            obj = new Engineer(answers.name, answers.id, answers.email, data.additionalInfo);
                            break;
                        case "Intern":
                            info = "School name";
                            obj = new Intern(answers.name, answers.id, answers.email, data.additionalInfo);
                            break;
                    }

                    team.push(obj);
                    fs.writeFile(outputPath, render(team), function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    if (data.addEmployee === true) {
                        addMember();
                    }
                    else {
                        render(team);
                    };

                });

        });
};



