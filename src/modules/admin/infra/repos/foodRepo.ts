import { FoodRepoInterface } from "../../domain/repos/foodRepo";
import FoodModel, { StatusType } from "../models/food";

export class FoodRepo implements FoodRepoInterface {

    public async create(food: FoodModel): Promise<FoodModel | null> {
        return FoodModel.create(food);
    }

    public async findByProducrCode(productCode: string[]): Promise<FoodModel[]> {
        return FoodModel.findAll({
            where: {
                productCode: { in: [...productCode] },
                status: StatusType.ACTIVE
            }
        });
    }

    exists(t: FoodModel): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    save(t: FoodModel): Promise<FoodModel> {
        throw new Error("Method not implemented.");
    }


    public createIndexes(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}