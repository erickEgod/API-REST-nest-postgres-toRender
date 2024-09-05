import { MigrationInterface, QueryRunner } from "typeorm";

export class First1725567262915 implements MigrationInterface {
    name = 'First1725567262915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat_table" RENAME COLUMN "name" TO "catName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat_table" RENAME COLUMN "catName" TO "name"`);
    }

}
