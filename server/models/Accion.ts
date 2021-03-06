import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey, Table, Length, BelongsToMany, ForeignKey, AllowNull, BelongsTo} from "sequelize-typescript";
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
        field:"COD_GRUP",
        unique:"UK_ACCI_GRUP_GRPE_PERM_USUA",
        allowNull:true
    })
    codigoGrupo!:string;

    @BelongsTo(()=>Grupo)
    grupo!:Grupo;

    @ForeignKey(()=>Usuario)
    @Column({
        type:DataType.INTEGER,
        comment:"Id del usuario",
        field:"ID_USUA",
        unique:"UK_ACCI_GRUP_GRPE_PERM_USUA",
        allowNull:true
    })
    idUsuario!:number;

    @BelongsTo(()=>Usuario)
    usuario!:Usuario;

    @ForeignKey(()=>GrupoPermiso)
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo del grupo de permisos",
        unique:"UK_ACCI_GRUP_GRPE_PERM_USUA",
        field:"COD_GRPE"
    })
    codigoGrupoPermiso!:string;

    @BelongsTo(()=>GrupoPermiso)
    grupoPermiso!:GrupoPermiso;

    @ForeignKey(()=>Permiso)
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo permiso",
        unique:"UK_ACCI_GRUP_GRPE_PERM_USUA",
        field:"COD_PERM"
    })
    codigoPermiso!:string;

    @BelongsTo(()=>Permiso)
    permiso!:Permiso;
   
}