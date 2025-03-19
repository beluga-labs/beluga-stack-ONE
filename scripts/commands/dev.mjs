#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';

export function dev() {
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
            console.log(chalk.yellow('⚠️ No -dev services found to start.'));
        }

        execSync('turbo run dev', { stdio: 'inherit' });
        console.log(chalk.green('✅ Development mode started!'));
    } catch (error) {
        console.error(chalk.red('❌ Error starting development mode:'), error);
    }
}
