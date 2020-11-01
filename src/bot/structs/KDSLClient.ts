import { AkairoClient, Category, Command, CommandHandler, ListenerHandler } from "discord-akairo";
import path from "path";
import config from '../../../config.json'
import chokidar from 'chokidar'
import { Collection } from "discord.js";
import { Intents } from "discord.js";

export default class KDSLClient extends AkairoClient {
    commandHandler: CommandHandler
    listenerHandler: ListenerHandler

    constructor() {
        super({
            disableMentions: 'everyone',
            presence: {
                activity: {
                    type: 'LISTENING',
                    name: `${config.commandPrefix}도움말`
                }
            }
        }, {
            ws: {
                intents: Intents.ALL
            }
        })

        this.listenerHandler = new ListenerHandler(this, {
            directory: path.resolve(path.join(__dirname, '../listeners')),
        })

        this.commandHandler = new CommandHandler(this, {
            directory: path.resolve(path.join(__dirname, '../commands')),
            prefix: config.commandPrefix,
            commandUtil: true
        })

        this.listenerHandler.setEmitters({
            client: this,
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        })

        this.commandHandler.useListenerHandler(this.listenerHandler)

        this.listenerHandler.loadAll()


        this.commandHandler.loadAll()

        if (config.watch) {
            chokidar.watch(this.commandHandler.directory).on('change', (path1) => {
                delete require.cache[require.resolve(path1)]
                for (const c of this.commandHandler.categories.values()) {
                    const cmd = c.find(r => path.resolve(r.filepath) === path.resolve(path1))
                    if (cmd) {
                        cmd.remove()
                        this.commandHandler.load(path1)
                        console.log(`Reloaded command on path ${path1}`)
                        return
                    }
                }
                this.commandHandler.load(path1)
                console.log(`Loaded command on path ${path1}`)
            })
            chokidar.watch(this.listenerHandler.directory).on('change', (path1) => {
                delete require.cache[require.resolve(path1)]
                for (const c of this.listenerHandler.categories.values()) {
                    const cmd = c.find(r => path.resolve(r.filepath) === path.resolve(path1))
                    if (cmd) {
                        cmd.remove()
                        this.listenerHandler.load(path1)
                        console.log(`Reloaded command on path ${path1}`)
                        return
                    }
                }
                this.listenerHandler.load(path1)
                console.log(`Loaded command on path ${path1}`)
            })
        }
    }
}