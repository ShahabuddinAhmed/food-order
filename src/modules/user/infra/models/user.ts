import { Model, DataTypes } from "sequelize";
import newSequelize from "../../../../infra/db/sequelize";
import OrderModel from "./order";

class UserModel extends Model {
    public id?: number;
    public name!: string;
    public email!: string;
    public password!: string;
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
    password: {
        type: DataTypes.STRING(255),
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

UserModel.hasMany(OrderModel);

export default UserModel;