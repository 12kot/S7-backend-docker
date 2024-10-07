import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1728307903157 implements MigrationInterface {
    name = ' $npmConfigName1728307903157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb" PRIMARY KEY ("username"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
