import {MigrationInterface, QueryRunner} from "typeorm";

export class db1642153540187 implements MigrationInterface {
    name = 'db1642153540187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerifiedEmail" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerifiedEmail"`);
    }

}
