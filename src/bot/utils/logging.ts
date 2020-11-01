import chalk from 'chalk'
import { inspect } from 'util'


const origConsole = console.log

function override(msg: any, format: string) {
    let f
    if (typeof msg === 'string') f = msg
    else f = inspect(msg, {depth: 0})
    return f.split('\n').map(r=>format.replace('{}', r)).join('\n')
}

console.log = (msg: any) => origConsole(override(msg, `${chalk.blue(`PID ${process.pid}`)} | ${chalk.cyan('LOG')} | {}`))
console.info = (msg: any) => origConsole(override(msg,`${chalk.blue(`PID ${process.pid}`)} | ${chalk.blueBright('INFO')} | {}`))
console.warn = (msg: any) => origConsole(override(msg,`${chalk.blue(`PID ${process.pid}`)} | ${chalk.yellow('WARN')} | {}`))
console.error = (msg: any) => origConsole(override(msg,`${chalk.blue(`PID ${process.pid}`)} | ${chalk.red('ERROR')} | {}`))
console.debug = (msg: any) => origConsole(override(msg,`${chalk.blue(`PID ${process.pid}`)} | ${chalk.yellowBright('DEBUG')} | {}`))
