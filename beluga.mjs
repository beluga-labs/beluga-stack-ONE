#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { execSync } from 'child_process';

const program = new Command();

program.name('beluga').description('CLI for beluga stack ONE').version('1.0.0');

// Setup command
program
    .command('setup')
    .description('Perform project setup')
    .action(() => {
        console.log(chalk.blue('Performing project setup...'));
        execSync('pnpm install', { stdio: 'inherit' });
        console.log(chalk.green('Setup complete!'));
    });

// Dev mode command
program
    .command('dev')
    .description('Start development mode')
    .action(() => {
        console.log(chalk.blue('Starting development mode...'));
        execSync(
            "docker compose -f docker-compose.local.yaml up $(docker compose -f docker-compose.local.yaml config --services | grep '\-dev$') -d",
            {
                stdio: 'inherit'
            }
        );
        execSync('turbo run dev', { stdio: 'inherit' });
        console.log(chalk.green('Development mode started!'));
    });

// Deploy command
program
    .command('deploy')
    .description('Perform deployment')
    .action(async () => {
        const { environment } = await inquirer.prompt([
            {
                type: 'list',
                name: 'environment',
                message: 'Select the deployment environment:',
                choices: ['local', 'production']
            }
        ]);

        if (environment === 'local') {
            console.log(chalk.blue('Performing local deployment...'));
            execSync(
                'docker compose -f docker-compose.local.yaml down db-dev',
                { stdio: 'inherit' }
            );
            execSync('docker compose -f docker-compose.local.yaml up --build', {
                stdio: 'inherit'
            });
            console.log(chalk.green('Local deployment complete!'));
        } else if (environment === 'production') {
            console.log(chalk.blue('Performing production deployment...'));
            execSync(
                'docker compose -f docker-compose.production.yaml up --build -d',
                { stdio: 'inherit' }
            );
            execSync('docker system prune --force', { stdio: 'inherit' });
            console.log(chalk.green('Production deployment complete!'));
        }
    });

program.parse(process.argv);
