const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// array of questions for user
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'Title',
            message: "What is the project's title? (Required)",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log('Please enter the title!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'Description',
            message: "Enter a description about this project.",
            validate: messageInput => {
                if (messageInput) {
                    return true;
                } else {
                    console.log('Please enter a description!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmTblofContents',
            message: 'Would you like to enter a Table of Contents?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmInstal',
            message: 'Do you have any installation instructions?',
            default: true
        },
        {
            type: 'input',
            name: 'Installation',
            message: "Enter any installation instructions",
            when: ({ confirmInstal }) => confirmInstal
        },
        {
            type: 'confirm',
            name: 'confirmUsage',
            message: 'Do you have any usage details?',
            default: true
        },
        {
            type: 'input',
            name: 'Usage',
            message: 'Provide instructions and examples for use. Include screenshots as needed.',
            when: ({ confirmUsage }) => confirmUsage
        },
        {
            type: 'confirm',
            name: 'confirmCredits',
            message: 'Do you have any collaborators?',
            default: true
        },
        {
            type: 'input',
            name: 'Credits',
            message: 'List your collaborators, if any, with links to their GitHub profiles.',
            when: ({ confirmCredits }) => confirmCredits
        },
        {
            type: 'confirm',
            name: 'confirmLicenses',
            message: 'Do you have any Licenses to site?',
            default: true
        },
        {
            type: 'checkbox',
            name: 'Licenses',
            message: 'What Licenses will you include for this project? (Check all that apply)',
            choices: ['MIT', 'Apache 2.0', 'ISC', 'Mozilla Public license', 'IBM Public license', 'Artistic license 2.0'],
            when: ({ confirmLicenses }) => confirmLicenses
        },
        {
            type: 'confirm',
            name: 'confirmBadges',
            message: 'Would you like to include badges?',
            default: true
        },
        {
            type: 'confirm',
            name: 'confirmContributing',
            message: 'Would you like to include the contributor covenant?',
            default: true
        },






    ]);


}

questions()
    .then(data => {
        const pageHTML = generateMarkdown(data);
        writeToFile('GenReadMe.md', pageHTML);

    })








// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) throw new Error(err);

        console.log('Page created! Check out GenReadMe.md in this directory to see it!');
    });
}

// function to initialize program
function init() {

}

// function call to initialize program
init();
