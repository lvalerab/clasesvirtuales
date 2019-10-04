import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey, Table, Length, BelongsToMany, ForeignKey} from "sequelize-typescript";
import {Grupo} from './Grupo';
import { GrupoPermiso } from "./GrupoPermiso";
import { Permiso } from "./Permiso"
import { Usuario } from "./Usuarios";

@Table({
    modelName:"acci_acciones"
})
export class Accion extends Model<Accion> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        comment:"Identificacion de la accion configurada",
        field:"ID_ACCI",
        primaryKey:true
    })
    id!:number;

    @ForeignKey(()=>Grupo)
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo del grupo de personas",
        field:"COD_GRUP"
    })
    codigoGrupo!:string;

    @ForeignKey(()=>GrupoPermiso)
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo del grupo de permisos",
        field:"COD_GRPE"
    })
    codigoGrupoPermiso!:string;

    @ForeignKey(()=>Permiso)
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo permiso",
        field:"COD_PERM"
    })
    codigoPermiso!:string;

    @ForeignKey(()=>Usuario)
    @Column({
        type:DataType.INTEGER,
        comment:"Id del usuario",
        field:"ID_USUA"
    })
    idUsuario!:number;
}