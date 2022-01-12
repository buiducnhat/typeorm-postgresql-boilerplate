import {MigrationInterface, QueryRunner} from "typeorm";

export class db1641979282762 implements MigrationInterface {
    name = 'db1641979282762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "avatar" character varying NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(15) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'Member', "password" character varying NOT NULL, "salt" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
