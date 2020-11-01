import './utils/logging'
import {ShardingManager} from 'discord.js'
import path from 'path'
import config from '../../config.json'

const manager = new ShardingManager(path.join(__dirname, 'bot.ts'), {
    execArgv: process.env.PRODUCTION === 'true' ? [] : ['-r', 'ts-node/register'],
    token: config.token
})

manager.on('shardCreate', shard => console.info(`Shard spawned: #${shard.id}`))

manager.spawn().then(() => console.info(`Shard spawn complete!`))
