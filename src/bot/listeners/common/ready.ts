import { CommandUtil } from "discord-akairo";
import { Listener } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import Knex from "knex";
import db from "../../utils/db";


declare module 'discord-akairo' {
    interface CommandUtil {
        embed(): MessageEmbed
        db: Knex
    }
}

CommandUtil.prototype.db = db

CommandUtil.prototype.embed = function() {
    const m = this.message
    return new MessageEmbed({
        footer: {
            text: m.author.tag,
            iconURL: m.author.displayAvatarURL({dynamic: true})
        },
        color: '#eb4034'
    })
}

export default class Ready extends Listener {
    constructor() {
        super('common:ready', {
            emitter: 'client',
            event: 'ready',
            category: 'common'
        })
    }

    exec() {
        if (!this.client.shard) {
            console.error('This bot must be run by sharding manager')
            return process.exit(1)
        }

        console.info(`Shard #${this.client.shard.ids.reduce((acc,cur)=>acc+cur)} ready!`)
    }
}