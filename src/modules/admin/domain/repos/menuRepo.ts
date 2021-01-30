import { Repo } from "../../../../shared/infra/Repo";
import MenuModel from "../../infra/models/menu";


export interface MenuRepoInterface extends Repo<MenuModel> {
    create(menu: MenuModel): Promise<MenuModel | null>;
}