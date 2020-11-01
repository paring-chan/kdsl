import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['도움말', '도움', 'help']
        })
    }

    exec(msg: Message) {
        const em = msg.util!.embed().setTitle('도움말')
        msg.util!.handler.categories.forEach(c => {
            em.addField(c.id, c.map(r=>`\`${r.aliases[0]}\``).join(' ')) //일
        })
        return msg.util!.send(em)
    }
}