import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey, Table, Length, BelongsToMany, ForeignKey} from "sequelize-typescript";
import { GrupoPermiso } from "./GrupoPermiso";
import { Permiso } from "./Permiso";

@Table({
    modelName:"GRPE_GRPE_PERM"
})
export class RelacionGrupoPermisoPermiso extends Model<RelacionGrupoPermisoPermiso> {
    @ForeignKey(()=>GrupoPermiso)
    codigo_grpe!:string;

    @ForeignKey(()=>Permiso)
    codigo_perm!:string;
}