#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';

export function dev() {
    console.log(chalk.blue('🚀 Starting development mode...'));
    try {
        execSync('turbo run dev', { stdio: 'inherit' });
        console.log(chalk.green('✅ Development mode started!'));
    } catch (error) {
        console.error(chalk.red('❌ Error starting development mode:'), error);
    }
}
