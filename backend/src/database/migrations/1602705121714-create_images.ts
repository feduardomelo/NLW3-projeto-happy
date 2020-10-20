import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602705121714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: "id",
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages', //qual tabela?
                    referencedColumnNames: ['id'],  //qual coluna na tabela especificada?
                    onUpdate: 'CASCADE', // CASCADE É p/ situações como "se o id de um orfanato trocar aqui trocar automaticamente"
                    onDelete: 'CASCADE'  // Se um orfanato for excluído as imagens também serem
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.dropTable('images')
    
    }

}
