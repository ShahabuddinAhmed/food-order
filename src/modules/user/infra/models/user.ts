import { Model, DataTypes } from "sequelize";
import newSequelize from "../../../../infra/db/sequelize";

class UserModel extends Model {
    public id?: number;
    public email!: string;
    public mobileNumber!: string;
    public address!: string;
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    mobileNumber: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: "user",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
    sequelize: newSequelize(),
    modelName: "user"
});

export default UserModel;