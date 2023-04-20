const fs = require('fs')
const configPath = process.env.INPUT_CONFIG_PATH

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
console.log(`Hello, ${config}!`)

process.stdout.write(`::set-output name=my_output::Hello, ${myInput}!`)