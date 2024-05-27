import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Appointments1716565474486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"appointments",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"day_date",
                        type:"datetime",
                    },
                    {
                        name:"doctor_id",
                        type:"int"
                    },
                    {
                        name:"client_id",
                        type:"int"
                    },
                    {
                        name:"description",
                        type:"varchar",
                        length:"200"
                    },
                    {
                        name:"price",
                        type:"int",
                    }
                ],
                foreignKeys:[
                    {
                        columnNames:["doctor_id"],
                        referencedTableName: "doctors",
                        referencedColumnNames:["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames:["client_id"],
                        referencedTableName: "clients",
                        referencedColumnNames:["id"],
                        onDelete: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }

}
