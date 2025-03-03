#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';

export function setup() {
    console.log(chalk.blue('🔧 Performing project setup...'));
    execSync('pnpm install', { stdio: 'inherit' });
    execSync('pnpm beluga sync all', { stdio: 'inherit' });
    console.log(chalk.green('✅ Setup complete!'));
}
