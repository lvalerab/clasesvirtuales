import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey, Table, Length} from "sequelize-typescript";
import { DataTypes } from "sequelize/types";

@Table({
    modelName:"USUA_USUARIOS"
})
export class Usuario extends Model<Usuario> {
    @Column({
        type: DataType.INTEGER,
        comment: "Clave principal",
        autoIncrement: true,
        primaryKey: true,
        field:"ID"
    })
    id!: number;

    @Column({
        type:DataType.STRING(60),
        comment:"Nombre del usuario",
        field:"USER_NAME"        
    })   
    nombre!:string;
}
