import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1728316562156 implements MigrationInterface {
    name = ' $npmConfigName1728316562156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")`);
    }

}
