const generateManager = require("./generateManager");
const generateEngineer = require("./generateEngineer");
const generateIntern = require("./generateIntern");
const generateTeamPage = require("./generateTeamPage");

const generateHTML = (data) => {
    let pageArray = [];

    data.forEach((employee) => {
        const role = employee.getRole();

        switch(role) {
            case "Manager":
                const managerCard = generateManager(employee);
                pageArray.push(managerCard);
                break;
            case "Engineer":
                const engineerCard = generateEngineer(employee);
                pageArray.push(engineerCard);
                break;
            case "Intern":
                const internCard = generateIntern(employee);
                pageArray.push(internCard);
                break;
        }
    });

    const employeeCards = pageArray.join('');
    const generateTeam = generateTeamPage(employeeCards);
    return generateTeam;
};

module.exports = generateHTML;