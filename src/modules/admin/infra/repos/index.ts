import { FoodRepo } from "./foodRepo";
import { MenuRepo } from "./menuRepo";

export const newMenuRepo = (): MenuRepo => {
    return new MenuRepo();
};

export const newFoodRepo = (): FoodRepo => {
    return new FoodRepo();
};