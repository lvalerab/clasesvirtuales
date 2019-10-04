import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey, Table, Length, BelongsToMany} from "sequelize-typescript";
import { Permiso } from "./Permiso";
import { RelacionGrupoPermisoPermiso } from "./RelacionGrupoPermisoPermiso";

@Table({
    modelName:"GRPE_GRUPO_PERMISOS"
})
export class GrupoPermiso extends Model<GrupoPermiso> {
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo del grupo de permisos",
        field:"COD_GRPE",
        primaryKey:true
    })
    codigo!:string;

    @Column({
        type:DataType.STRING(60),
        comment:"Nombre del grupo de permisos",
        field:"GRPE_NOMBRE"
    })
    nombre!:string;

    @BelongsToMany(()=>Permiso,()=>RelacionGrupoPermisoPermiso)
    permisos!:Permiso[];
}