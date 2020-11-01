import { Listener } from "discord-akairo";
import { Guild } from "discord.js";
import './ready'

export default class GuildDelete extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        })
    }
    async exec(guild: Guild) {
        const g = (await this.client.db('guilds').where({id: guild.id}))[0]
        if (g) {
            console.log(`LEFT GUILD: ${guild.name}(${guild.id})`)
            await this.client.db('guilds').delete().where({id: guild.id})
        }
    }
}