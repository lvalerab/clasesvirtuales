import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey, Table, Length} from "sequelize-typescript";

@Table({
    modelName:"GRUP_GRUPOS"
})
export class Grupo extends Model<Grupo> {
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo del grupo",
        primaryKey:true,
        field:"COD_GRUP"
    })
    codigo!:string;

    @Column({
        type:DataType.STRING(60),
        comment:"Nombre del grupo",
        field:"GRUP_NAME"
    })
    nombre!:string;

    @Column({
        type:DataType.TEXT,
        comment:"Descripcion del grupo",
        field:"GRUP_DESCR"
    })
    descripcion!:string;
}