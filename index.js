const fs = require('fs')
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('github-token');
        const configPath = core.getInput('config_path')
        const octokit = new github.GitHub(token);
        const context = github.context;

        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
        console.log(`Hello, ${config}!`)

        process.stdout.write(`::set-output name=my_output::Hello, ${myInput}!`)

        // Get the owner and repository from the context
        const owner = context.payload.repository.owner.login;
        const repo = context.payload.repository.name;

        // Get the PR number from the context
        const prNumber = context.payload.pull_request.number;

        // Get the diff of the PR using the GitHub API
        const { data: diff } = await octokit.pulls.get({
            owner,
            repo,
            pull_number: prNumber,
            headers: { accept: 'application/vnd.github.v3.diff' }
        });

        // Split the diff into lines and iterate over each line
        const lines = diff.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Check if the line represents a modified line of code
            if (line.startsWith('+') || line.startsWith('-')) {
                // Do something with the modified line
                console.log(`Modified line: ${line}`);
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
