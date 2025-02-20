import db from '../config/database';
import { DataTypes } from 'sequelize';

const Gadgets = db.define('Gadgets', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Available", "Deployed", "Destroyed", "Decommissioned"),
        defaultValue: "Available"
    },
    decomissionedAt: {
        type: DataTypes.DATE
    }
});

export default Gadgets;