#!/usr/bin/env node

import { Command } from 'commander'
import { getRes } from './src/api.js';
import { readConfig, setConfig, logger } from './src/util/index.js';
import 'colors';

const program = new Command();
program
    .name('fy')
    .description('a tool for translation')
    .arguments('[word]', 'word to input')
    .action(async (q) => {
        if (q === undefined || !String(q).trim().length) {
            console.log('tips: words cannot be empty.'.red)
            return
        }

        const { appid, key } = await readConfig()
        if (!appid || !key) {
            console.log('tips: can not find appid or key, please check your config.json at first.'.red)
            return
        }
        
        const data = await getRes(q, appid, key)
        logger(data)
    })
    .version('0.0.1');

program.command('show')
    .description('show your config info')
    .action(async () => {
        const { appid, key } = await readConfig()
        console.log('appid:', appid, '\nkey:', key,)
    })

program.command('config')
    .description('config your info like this: fy confing -a xxx -k xxx or fy confing --appid xxx --key xxx')
    .arguments('[string]', 'info to input')
    .arguments('[string]', 'info to input')
    .option('-a,--appid', 'input your appid')
    .option('-k,--key', 'input your key')
    .action((appid, key, options) => {
        setConfig({ appid, key, options })
    })



program.parse();

