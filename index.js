const generateHTML = require("./src/generateHTML");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const fs = require("fs");

const teamArray = [];

const addManager = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "Who is the manager of this team?",
            validate: nameInput => {
                if (!nameInput) {
                    console.log("Please enter the manager's name.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Please enter the manager's ID.",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please enter the manager's ID number.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Please enter the manager's email address.",
            validate: nameInput => {
                validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(nameInput);
                if (!validEmail) {
                    console.log("Please enter a valid emeil.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter the manager's office number",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please enter a valid office number.");
                    return false;
                } else {
                    return true;
                }
            }
        }
    ])
    .then((res) => {
        const { name, id, email, officeNumber } = res;
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager);
        console.log(manager);
    })
};

const addEmployee = () => {
    console.log(`
    ===== Add employees to the team =====
    `);

    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Please choose your employee's role.",
            choices: ["Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "What is the employee's name?",
            validate: nameInput => {
                if (!nameInput) {
                    console.log("Please enter a name for the employee.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Please enter the employee's ID number.",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please enter a valid ID number.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Please enter the employee's email address.",
            validate: nameInput => {
                validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(nameInput);
                if (!validEmail) {
                    console.log("Please enter a valid emeil.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Please enter the engineer's Github username.",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (!nameInput) {
                    console.log("Please enter the Github username.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "Please enter the intern's school name.",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (!nameInput) {
                    console.log("Please enter the school name.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAddEmployee",
            message: "Would you like to add another employee?",
            default: false
        }
    ])
    .then((res) => {
        let { name, id, email, role, github, school, confirmAddEmployee } = res;
        let employee;

        switch(role) {
            case "Engineer":
                employee = new Engineer (name, id, email, github);
                break;
            case "Intern":
                employee = new Intern (name, id, email, school);
                break;
        };

        teamArray.push(employee);

        if (confirmAddEmployee) {
            return addEmployee(teamArray);
        } else {
            return teamArray
        }
    })
};

const writeFile = (data) => {
    fs.writeFile("./dist/index.html", data, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your team profile has been successfully generated.")
        }
    })
};

addManager()
    .then(addEmployee)
    .then((teamArray) => {
        return generateHTML(teamArray);
    })
    .then((pageHTML) => {
        return writeFile(pageHTML);
    })
    .catch((err) => {
        console.log(err);
    });