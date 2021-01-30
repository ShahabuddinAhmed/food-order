import { Model, DataTypes } from "sequelize";
import newSequelize from "../../../../infra/db/sequelize";
import { PaymentStatus, PaymentStatusType } from "../../domain/value/paymentStatus";
import { Discount, DiscountType } from "../../domain/value/discountType";
import OrderDetailModel from "../models/orderDetail";

class OrderModel extends Model {
    public id?: number;
    public actualAmount!: number;
    public totalAmount!: number;
    public discountType!: Discount;
    public discount!: number;
    public couponCode!: string;
    public couponValue!: number;
    public orderCode!: string;
    public paymentStatus!: PaymentStatus;
    public restaurantAddress!: string;
}

OrderModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    actualAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discountType: {
        type: DataTypes.STRING(25),
        validate: {
            isIn: [[DiscountType.PERCENTAGE, DiscountType.FLAT]]
        },
        allowNull: true
    },
    discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    couponCode: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    couponValue: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    },
    orderCode: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.STRING(25),
        validate: {
            isIn: [[PaymentStatusType.PAID, PaymentStatusType.UNPAID]]
        },
        allowNull: false
    },
    restaurantAddress: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "order",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
    sequelize: newSequelize(),
    modelName: "order"
});

OrderModel.hasMany(OrderDetailModel, { sourceKey: "id", foreignKey: "orderID" });

export default OrderModel;