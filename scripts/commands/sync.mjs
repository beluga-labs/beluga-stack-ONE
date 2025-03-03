#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';

export async function sync(app) {
    const apps = ['web'];
    if (!app) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'app',
                message: '📂 Select the app(s) to sync:',
                choices: ['all', ...apps]
            }
        ]);
        app = answers.app;
    }
    const appsToSync = app === 'all' ? apps : [app];

    for (const currentApp of appsToSync) {
        console.log(chalk.blue(`🔄 Syncing ${currentApp}...`));
        try {
            const envPath = `./apps/${currentApp}/.env.local`;
            if (!fs.existsSync(envPath)) {
                console.error(
                    chalk.red(`❌ .env.local file not found for ${currentApp}`)
                );
                continue;
            }

            const envVars = Object.fromEntries(
                fs
                    .readFileSync(envPath, 'utf-8')
                    .split('\n')
                    .filter((line) => line && !line.startsWith('#'))
                    .map((line) => line.trim().split('='))
            );

            const { SERVER_USER, SERVER_HOST, SERVER_WORKDIR_PRODUCTION } =
                envVars;
            console.log(chalk.blue('🗂️ Creating database dump on server...'));
            execSync(
                `ssh ${SERVER_USER}@${SERVER_HOST} -t "cd ${SERVER_WORKDIR_PRODUCTION} && node scripts/db-dump.mjs ${currentApp}"`,
                { stdio: 'inherit' }
            );
            console.log(chalk.green(`✅ Sync for ${currentApp} complete!`));
        } catch (error) {
            console.error(
                chalk.red(`❌ Error during sync of ${currentApp}:`),
                error
            );
        }
    }
}
