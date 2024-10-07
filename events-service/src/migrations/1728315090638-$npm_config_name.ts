import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1728315090638 implements MigrationInterface {
    name = ' $npmConfigName1728315090638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" character varying NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "date" character varying NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
