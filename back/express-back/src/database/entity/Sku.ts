import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export abstract class Sku {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string
}