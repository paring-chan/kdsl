import { Listener } from "discord-akairo";
import { Guild } from "discord.js";
import './ready'

export default class GuildCreate extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        })
    }
    async exec(guild: Guild) {
        const g = (await this.client.db('guilds').where({id: guild.id}))[0]
        if (!g) {
            console.log(`NEW GUILD: ${guild.name}(${guild.id})`)
            await this.client.db('guilds').insert({id: guild.id})
        }
    }
}