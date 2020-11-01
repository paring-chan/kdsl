import { Listener } from "discord-akairo";

export default class Ready extends Listener {
    constructor() {
        super('common:commandError', {
            emitter: 'commandHandler',
            event: 'error',
            category: 'common'
        })
    }

    exec(error: Error) {
        console.log(error)
    }
}