#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { setup } from './commands/setup.mjs';
import { sync } from './commands/sync.mjs';
import { dev } from './commands/dev.mjs';
import { deploy } from './commands/deploy.mjs';

const program = new Command();

program.name('beluga').description('CLI for beluga stack ONE').version('2.0.0');

program.command('setup').description('Perform project setup').action(setup);

program
    .command('sync [app]')
    .description('Sync database and files from production')
    .action(sync);

program.command('dev').description('Start development mode').action(dev);

program
    .command('deploy [app] [environment]')
    .description('Perform deployment')
    .action(deploy);

program.parse(process.argv);
