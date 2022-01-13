import {MigrationInterface, QueryRunner} from "typeorm";

export class db1642079430314 implements MigrationInterface {
    name = 'db1642079430314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."social_provider_enum" AS ENUM('google', 'facebook')`);
        await queryRunner.query(`ALTER TABLE "social" ADD "provider" "public"."social_provider_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social" DROP COLUMN "provider"`);
        await queryRunner.query(`DROP TYPE "public"."social_provider_enum"`);
    }

}
