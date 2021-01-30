import { MenuRepoInterface } from "../../domain/repos/menuRepo";
import MenuModel from "../models/menu";

export class MenuRepo implements MenuRepoInterface {

    public async create(menu: MenuModel): Promise<MenuModel | null> {
        return MenuModel.create(menu);
    }

    exists(t: MenuModel): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    save(t: MenuModel): Promise<MenuModel> {
        throw new Error("Method not implemented.");
    }


    public createIndexes(): Promise<any> {
        throw new Error("Method not implemented.");
    }

}