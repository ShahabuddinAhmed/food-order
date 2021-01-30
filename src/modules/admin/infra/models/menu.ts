import { Model, DataTypes } from "sequelize";
import newSequelize from "../../../../infra/db/sequelize";
import FoodModel from "./food";
import { StatusType } from "./food";

class MenuModel extends Model {
    public id?: number;
    public name!: string;
    public status!: StatusType;
}

MenuModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            isIn: [[StatusType.ACTIVE, StatusType.INACTIVE]]
        },
        allowNull: true
    },
}, {
    tableName: "menu",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
    sequelize: newSequelize(),
    modelName: "menu"
});

MenuModel.hasMany(FoodModel, { sourceKey: "id", foreignKey: "menuID" });

export default MenuModel;