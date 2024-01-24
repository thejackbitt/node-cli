const inquirer = require("inquirer");
const fs = require("fs");
const licenseLUT = [
    [
        'Apache-2.0',
        '![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0'
    ],
    [
        'BSL-1.0',
        '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)'
    ],
    [
        'BSD-3-Clause',
        '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'
    ],
    [
        'BSD-2-Clause',
        '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)'
    ],
    [
        'CC',
        '[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)'
    ],
    [
        'CC0-1.0',
        '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)'
    ],
    [
        'CC-BY-4.0',
        '[![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)'
    ],
    [
        'CC-BY-SA-4.0',
        '[![License: CC BY-SA 4.0](https://licensebuttons.net/l/by-sa/4.0/80x15.png)](https://creativecommons.org/licenses/by-sa/4.0/)'
    ],
    [
        'EPL-1.0',
        '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)'
    ],
    [
        'GPL-3.0',
        '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
    ],
    [
        'GPL-2.0',
        '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)'
    ],
    [
        'AGPL-3.0',
        '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)'
    ],
    [
        'LGPL-3.0',
        '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)'
    ],
    [
        'ISC',
        '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)'
    ],
    [
        'MIT',
        '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
    ],
    [
        'MPL-2.0',
        '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
    ],
    [
        'Unlicense',
        '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
    ],
    [
        'WTFPL',
        '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)'
    ],
    [
        'Zlib',
        '[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)'
    ]
]

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
    {
        type: "list",
        message: "What license is this project under? *required",
        name: "license",
        choices: [
            { key: 'Apache license 2.0', name: 'Apache-2.0', value: 'Apache-2.0' },
            { key: 'Boost Software License 1.0', name: 'BSL-1.0', value: 'BSL-1.0' },
            { key: 'BSD 2-clause "Simplified" license', name: 'BSD-2-Clause', value: 'BSD-2-Clause' },
            { key: 'BSD 3-clause "New" or "Revised" license', name: 'BSD-3-Clause', value: 'BSD-3-Clause' },
            { key: 'Creative Commons license family', name: 'CC', value: 'CC' },
            { key: 'Creative Commons Zero v1.0 Universal', name: 'CC0-1.0', value: 'CC0-1.0' },
            { key: 'Creative Commons Attribution 4.0', name: 'CC-BY-4.0', value: 'CC-BY-4.0' },
            { key: 'Creative Commons Attribution Share Alike 4.0', name: 'CC-BY-SA-4.0', value: 'CC-BY-SA-4.0' },
            { key: 'Do What The F*ck You Want To Public License', name: 'WTFPL', value: 'WTFPL' },
            { key: 'Eclipse Public License 1.0', name: 'EPL-1.0', value: 'EPL-1.0' },
            { key: 'Eclipse Public License 2.0', name: 'EPL-2.0', value: 'EPL-2.0' },
            { key: 'GNU Affero General Public License v3.0', name: 'AGPL-3.0', value: 'AGPL-3.0' },
            { key: 'GNU General Public License family', name: 'GPL', value: 'GPL' },
            { key: 'GNU General Public License v2.0', name: 'GPL-2.0', value: 'GPL-2.0' },
            { key: 'GNU General Public License v3.0', name: 'GPL-3.0', value: 'GPL-3.0' },
            { key: 'GNU Lesser General Public License family', name: 'LGPL', value: 'LGPL' },
            { key: 'GNU Lesser General Public License v2.1', name: 'LGPL-2.1', value: 'LGPL-2.1' },
            { key: 'GNU Lesser General Public License v3.0', name: 'LGPL-3.0', value: 'LGPL-3.0' },
            { key: 'ISC', name: 'ISC', value: 'ISC' },
            { key: 'MIT', name: 'MIT', value: 'MIT' },
            { key: 'Mozilla Public License 2.0', name: 'MPL-2.0', value: 'MPL-2.0' },
            { key: 'The Unlicense', name: 'Unlicense', value: 'Unlicense' },
            { key: 'zLib License', name: 'Zlib', value: 'Zlib' },
        ]
    },
    {
        type: "input",
        message: "What is your GitHub username? *required",
        name: "github",
    },
    {
        type: "input",
        message: "Finally, what is your email? *required",
        name: "email",
    },
  ])
  .then((response) => {
    const { title, desc, info, guide, test, license, email, github } = response;
    let licenseBadge = licenseLUT.find(l => l[0] === license)[1] || '';

    let infoText = info && info !== "N/A" ? `\n\n## Usage Information\n${info}` : '';
    let guideText = guide && guide !== "N/A" ? `\n\n## Contribution Guidelines\n${guide}` : '';
    let testText = test && test !== "N/A" ? `\n\n## Test Instructions\n${test}` : '';

    let optionalText = infoText + guideText + testText;

    fs.writeFile(
      "newREADME.md",
      `# ${title}\n${licenseBadge}\n## Description\n${desc}${optionalText}\n## Questions\nIf you have any questions, you can reach me at ${email}.\n\n<https://github.com/${github}>`,
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log('README file created successfully.');
      }
    );
  });