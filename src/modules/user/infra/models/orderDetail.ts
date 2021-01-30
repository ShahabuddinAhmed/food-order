import { Model, DataTypes } from "sequelize";
import newSequelize from "../../../../infra/db/sequelize";

class OrderDetailModel extends Model {
    public id?: number;
    public title!: string;
    public price!: number;
    public quantity!: number;
    public userID!: number;
}

OrderDetailModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "orderDetail",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
    sequelize: newSequelize(),
    modelName: "orderDetail"
});

export default OrderDetailModel;