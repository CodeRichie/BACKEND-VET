import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Doctors1716564467248 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"doctors",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"user_id",
                        type:"int",
                    },
                    {
                        name:"style",
                        type:"varchar",
                        length:"20"
                    },
                    {
                        name:"area",
                        type:"varchar",
                        length:"50"
                    }
                ],
                foreignKeys:[
                    {
                        columnNames:["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames:["id"],
                        onDelete: "CASCADE"

                    },
                    
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void>  {
        await queryRunner.dropTable("doctors");
    }

}