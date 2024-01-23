const inquirer = require("inquirer");
const fs = require("fs");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your project's title? *required",
      name: "title",
    },
    {
      type: "input",
      message: "What is the description? *required",
      name: "desc",
    },
    {
      type: "input",
      message: "What is the usage information? (if none, type N/A)",
      name: "info",
    },
    {
      type: "input",
      message: "What are the contribution guidelines? (if none, type N/A)",
      name: "guide",
    },
    {
      type: "input",
      message: "What are the test instructions? (if none, type N/A)",
      name: "test",
    },
  ])
  .then((response) => {
    const { title, desc, info, guide, test } = response;

    let infoText = info && info !== "N/A" ? `\n\n## Usage Information\n${info}` : '';
    let guideText = guide && guide !== "N/A" ? `\n\n## Contribution Guidelines\n${guide}` : '';
    let testText = test && test !== "N/A" ? `\n\n## Test Instructions\n${test}` : '';

    let optionalText = infoText + guideText + testText;

    fs.writeFile(
      "newREADME.md",
      `# ${title}\n\n## Description\n${desc}${optionalText}`,
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log('README file created successfully.');
      }
    );
  });