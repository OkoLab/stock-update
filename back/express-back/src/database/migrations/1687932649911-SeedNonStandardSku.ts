import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedNonStandardSku1687932649911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO nonstandard_sku (name, standardname) VALUES ('SCD1sfsfsd-5-6', 'AN-D1-1--')`,
        )
        await queryRunner.query(
            `INSERT INTO nonstandard_sku (name, standardname) VALUES ('csdcdsrK;cdeecsd-5-6', 'AN-D1-1-K9-1--')`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM nonstandard_sku`,
        )
    }
}
