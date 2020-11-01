import Knex from "knex";
import config from '../../../config.json'

export default Knex(config.db)