import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1728318129338 implements MigrationInterface {
    name = ' $npmConfigName1728318129338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "participant" ("username" character varying NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_43a1b993019430a70120c096467" PRIMARY KEY ("username", "eventId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "participant"`);
    }

}
