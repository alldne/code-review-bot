const myInput = process.env.INPUT_MY_INPUT

console.log(`Hello, ${myInput}!`)

process.stdout.write(`::set-output name=my_output::Hello, ${myInput}!`)