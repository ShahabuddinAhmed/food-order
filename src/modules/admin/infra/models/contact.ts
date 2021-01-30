import { Model, DataTypes } from "sequelize";
import newSequelize from "../../../../infra/db/sequelize";

class ContactModel extends Model {
    public id?: number;
    public name!: string;
    public mobileNumber!: string;
}

ContactModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "contact",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
    sequelize: newSequelize(),
    modelName: "contact"
});

export default ContactModel;