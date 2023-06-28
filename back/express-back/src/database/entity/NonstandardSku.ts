import { Column, Entity } from "typeorm";
import { Sku } from "./Sku";

@Entity()
export class NonstandardSku extends Sku {
    @Column()
    standardname: string
}