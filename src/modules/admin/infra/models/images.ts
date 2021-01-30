import { Model, DataTypes } from "sequelize";
import newSequelize from "../../../../infra/db/sequelize";

class ImagesModel extends Model {
    public id?: number;
    public name!: string;
}

ImagesModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "images",
    freezeTableName: true,
    timestamps: true,
    underscored: false,
    sequelize: newSequelize(),
    modelName: "images"
});

export default ImagesModel;