import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey, Table, Length, BelongsToMany, ForeignKey} from "sequelize-typescript";
import { GrupoPermiso } from "./GrupoPermiso";
import { Permiso } from "./Permiso";
import { Usuario } from "./usuarios";

@Table({
    modelName:"grpe_grpe_perm"
})
export class RelacionGrupoPermisoPermiso extends Model<RelacionGrupoPermisoPermiso> {
    @ForeignKey(()=>GrupoPermiso)
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo del grupo de permisos",
        field:"COD_GRPE",
        unique:'PK_GRPE_GRPE_PERM'
    })
    cod_grpe!:string;

    @ForeignKey(()=>Permiso)
    @Column({
        type:DataType.STRING(10),
        comment:"Codigo del grupo de permisos",
        field:"COD_PERM",
        unique:'PK_GRPE_GRPE_PERM'
    })
    cod_perm!:string;
}