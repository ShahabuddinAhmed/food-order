import { Model, DataTypes } from "sequelize";
import newSequelize from "../../../../infra/db/sequelize";
import { OrderStatusType } from "../../domain/value/orderStatus";
import { PaymentStatusType } from "../../domain/value/paymentStatus";

class OrderModel extends Model {
    public id?: number;
    public actualAmount!: number;
    public totalAmount!: number;
    public discountType!: number;
    public discount!: number;
    public couponCode!: string;
    public couponValue!: number;
    public deliveryCharge!: number;
    public orderStatus!: OrderStatusType;
    public paymentStatus!: PaymentStatusType;
    public restaurantAddress!: string;
}

OrderModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    actualAmount: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    subtotal: {
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderStatus: {
        type: DataTypes.STRING(25),
        validate: {
            isIn: [[OrderStatusType.CANCELLED, OrderStatusType.DELIVERED, OrderStatusType.PROCESSING]]
        },
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

export default OrderModel;