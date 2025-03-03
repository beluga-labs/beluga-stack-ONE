#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';
import inquirer from 'inquirer';

export async function deploy(app, environment) {
    const apps = ['web'];
    if (!app || !environment) {
        console.log(
            chalk.yellow(
                '⚠️ No arguments provided. Launching interactive selection...'
            )
        );
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'app',
                message: 'Select the app to deploy:',
                choices: [apps]
            },
            {
                type: 'list',
                name: 'environment',
                message: 'Select the deployment environment:',
                choices: ['local', 'production']
            }
        ]);
        app = answers.app;
        environment = answers.environment;
    }
    console.log(
        chalk.blue(
            `🚀 Deploying ${chalk.bold(app)} in ${chalk.bold(environment)} mode...`
        )
    );
    try {
        if (environment === 'local') {
            console.log(
                chalk.yellow('🛑 Stopping existing local containers...')
            );
            execSync('docker compose down', { stdio: 'inherit' });
        }
        execSync(
            `docker compose -f docker-compose.${environment}.yaml up --build -d`,
            { stdio: 'inherit' }
        );
        console.log(
            chalk.green(`✅ Deployment for ${app} in ${environment} complete!`)
        );
    } catch (error) {
        console.error(chalk.red('❌ Error during deployment:'), error);
    }
}
