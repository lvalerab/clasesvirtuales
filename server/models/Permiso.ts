import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey, Table, Length, BelongsToMany} from "sequelize-typescript";
import { GrupoPermiso } from "./GrupoPermiso";
import {RelacionGrupoPermisoPermiso} from './RelacionGrupoPermisoPermiso';
import { Col } from "sequelize/types/lib/utils";

@Table({
    modelName:"perm_permisos"
})
export class Permiso extends Model<Permiso> {
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo del permiso",
        field:"COD_PERM",
        primaryKey:true
    })
    codigo!:string;

    @Column({
        type:DataType.STRING(60),
        comment:"Nombre del permiso",
        field:"PERM_NOMBRE"
    })
    nombre!:string;

    @BelongsToMany(()=>GrupoPermiso,()=>RelacionGrupoPermisoPermiso)
    grupos_permisos!:GrupoPermiso[];
}