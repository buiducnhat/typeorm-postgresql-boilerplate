import {MigrationInterface, QueryRunner} from "typeorm";

export class db1642079008422 implements MigrationInterface {
    name = 'db1642079008422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('Admin', 'Member')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "avatar" character varying, "email" character varying NOT NULL, "phone" character varying(15), "role" "public"."user_role_enum" NOT NULL DEFAULT 'Member', "password" character varying NOT NULL, "salt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social" ("id" SERIAL NOT NULL, "socialId" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "avatar" character varying, "email" character varying, "phone" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, CONSTRAINT "PK_645aa1cff2b9f7b0e3e73d66b4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "social" ADD CONSTRAINT "FK_4cda297c26dea7a3b8d08b9ba18" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social" DROP CONSTRAINT "FK_4cda297c26dea7a3b8d08b9ba18"`);
        await queryRunner.query(`DROP TABLE "social"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
