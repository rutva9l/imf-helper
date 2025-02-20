import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/gadgets')

export default sequelize;