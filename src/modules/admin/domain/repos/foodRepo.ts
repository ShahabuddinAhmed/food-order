import { Repo } from "../../../../shared/infra/Repo";
import FoodModel from "../../infra/models/food";


export interface FoodRepoInterface extends Repo<FoodModel> {
    create(food: FoodModel): Promise<FoodModel | null>;
    findByProducrCode(productCode: string[]): Promise<FoodModel[]>;
}