import { Model, DataTypes } from "sequelize";
import newSequelize from "../../../../infra/db/sequelize";

export enum StatusType {
    ACTIVE = "Active",
    INACTIVE = "InActive"
}

class FoodModel extends Model {
    public id?: number;
    public title!: string;
    public restaurantName!: string;
    public productCode!: string;
    public price!: number;
    public rating?: number;
    public status!: StatusType;
    public restaurantAddress!: string;
}

FoodModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restaurantName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        validate: {
            isIn: [[StatusType.ACTIVE, StatusType.INACTIVE]]
        },
        allowNull: true
    },
    restaurantAddress: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "food",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
    sequelize: newSequelize(),
    modelName: "food"
});

export default FoodModel;