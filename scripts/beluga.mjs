#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

const program = new Command();

program.name('beluga').description('CLI for beluga stack ONE').version('2.0.0');

// Function to get available apps from /apps folder
function getAvailableApps() {
    const appsDir = path.join(process.cwd(), 'apps');
    const apps = fs
        .readdirSync(appsDir)
        .filter((file) => {
            const packageJsonPath = path.join(appsDir, file, 'package.json');
            return fs.existsSync(packageJsonPath);
        })
        .map((file) => {
            const packageJsonPath = path.join(appsDir, file, 'package.json');
            const packageJson = JSON.parse(
                fs.readFileSync(packageJsonPath, 'utf-8')
            );
            return packageJson.name;
        });
    return apps;
}

// Deploy Command
program
    .command('deploy')
    .argument('[app]', 'Name of the app to deploy')
    .argument('[environment]', 'Environment to deploy to (local or production)')
    .description('Perform deployment')
    .action(async (app, environment) => {
        const apps = getAvailableApps();

        if (!app) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'app',
                    message: '📂 Select the app to deploy:',
                    choices: ['all', ...apps]
                }
            ]);
            app = answers.app;
        }

        if (!environment) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'environment',
                    message: '🌐 Select the environment to deploy to:',
                    choices: ['local', 'production']
                }
            ]);
            environment = answers.environment;
        }

        console.log(
            chalk.blue(
                `🚀 Starting deployment for ${chalk.bold(app)} in ${chalk.bold(environment)} mode...`
            )
        );

        try {
            if (environment === 'local') {
                console.log(
                    chalk.blue('🛑 Stopping existing local dev containers...')
                );

                const devServices = execSync(
                    `docker compose -f docker-compose.yaml config --services`,
                    { encoding: 'utf-8' }
                )
                    .split('\n')
                    .map((service) => service.trim())
                    .filter((service) => service.endsWith('-dev'))
                    .join(' ');

                if (devServices) {
                    execSync(
                        `docker compose -f docker-compose.yaml stop ${devServices}`,
                        { stdio: 'inherit' }
                    );
                } else {
                    console.log(
                        chalk.yellow('⚠️ No -dev services found to stop.')
                    );
                }

                console.log(chalk.blue('📦 Starting non-dev containers...'));

                const nonDevServices = execSync(
                    `docker compose -f docker-compose.yaml config --services`,
                    { encoding: 'utf-8' }
                )
                    .split('\n')
                    .map((service) => service.trim())
                    .filter((service) => !service.endsWith('-dev'))
                    .join(' ');

                if (nonDevServices) {
                    execSync(
                        `docker compose -f docker-compose.yaml up ${nonDevServices} -d`,
                        { stdio: 'inherit' }
                    );
                } else {
                    console.log(
                        chalk.yellow('⚠️ No non-dev services found to start.')
                    );
                }

                console.log(chalk.blue('📦 Building local services...'));

                if (app === 'all') {
                    execSync(`turbo run build`, { stdio: 'inherit' });
                } else {
                    execSync(`turbo run build --filter=${app}...`, {
                        stdio: 'inherit'
                    });
                }

                console.log(
                    chalk.green(
                        `✅ Local deployment for ${chalk.bold(app)} complete!`
                    )
                );
            } else if (environment === 'production') {
                console.log(
                    chalk.blue(
                        `🌍 Deploying ${chalk.bold(app)} to production...`
                    )
                );

                if (app === 'all') {
                    execSync(`turbo run build`, { stdio: 'inherit' });
                } else {
                    execSync(`turbo run build --filter=${app}...`, {
                        stdio: 'inherit'
                    });
                }

                console.log(
                    chalk.green(
                        `✅ Production deployment for ${chalk.bold(app)} complete!`
                    )
                );
            } else {
                console.error(
                    chalk.red(
                        '❌ Error: Invalid environment. Use "local" or "production".'
                    )
                );
                process.exit(1);
            }
        } catch (error) {
            console.error(chalk.red('❌ Error during deployment:'), error);
            process.exit(1);
        }
    });

// Dev Command
program
    .command('dev')
    .description('Start development mode')
    .action(() => {
        console.log(chalk.blue('🚀 Starting development mode...'));

        try {
            const services = execSync(
                'docker compose -f docker-compose.yaml config --services',
                { encoding: 'utf-8' }
            )
                .split('\n')
                .map((service) => service.trim())
                .filter((service) => service.endsWith('-dev'))
                .join(' ');

            if (services) {
                execSync(
                    `docker compose -f docker-compose.yaml up ${services} -d`,
                    { stdio: 'inherit' }
                );
            } else {
                console.log(
                    chalk.yellow('⚠️ No -dev services found to start.')
                );
            }

            execSync('turbo run dev', { stdio: 'inherit' });
            console.log(chalk.green('✅ Development mode started!'));
        } catch (error) {
            console.error(
                chalk.red('❌ Error starting development mode:'),
                error
            );
        }
    });

program.parse(process.argv);
