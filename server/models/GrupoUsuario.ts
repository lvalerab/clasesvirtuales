import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey,ForeignKey, Table, Length, BelongsToMany} from "sequelize-typescript";
import { Grupo } from "./Grupo";
import { Usuario } from "./usuarios";

@Table({
    modelName:"grus_grup_usua"
})
export class GrupoUsuario extends Model<GrupoUsuario> {
    @ForeignKey(()=>Grupo)
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo del grupo",
        field:"COD_GRUP",
        unique:"UX_GRUPO_USUARIO"
    })
    codGrupo!:string;

    @ForeignKey(()=>Usuario)
    @Column({
        type:DataType.INTEGER,
        comment:"Id. del usuario",
        field:"ID_USUA",
        unique:"UX_GRUPO_USUARIO"
    })
    idUsua!:number;
}