import { UserRepo } from "./userRepo";
import { OrderRepo } from "./orderRepo";

export const newUserRepo = (): UserRepo => {
    return new UserRepo();
};

export const newOrderRepo = (): OrderRepo => {
    return new OrderRepo();
};