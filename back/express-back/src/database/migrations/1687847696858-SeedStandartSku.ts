import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedStandartSku1687847696858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO standard_sku (name) VALUES ('SC-D5-2-K8-20--')`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM standard_sku`,
        )
    }

}
