import KDSLClient from './structs/KDSLClient'
import './utils/logging'
import config from '../../config.json'


const client = new KDSLClient()


client.login(config.token)
