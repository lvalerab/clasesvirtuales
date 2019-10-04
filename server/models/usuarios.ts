import {AutoIncrement, Column, DataType, HasAssociation, HasMany, HasOne, Model, PrimaryKey, Table, Length} from "sequelize-typescript";


@Table({
    modelName:"USUA_USUARIOS"
})
export class Usuario extends Model<Usuario> {
    @Column({
        type: DataType.INTEGER,
        comment: "Clave principal",
        autoIncrement: true,
        primaryKey: true,
        field:"ID_USUA"
    })
    id!: number;

    @Column({
        type:DataType.STRING(60),
        comment:"Nombre del usuario",
        field:"USER_NAME"        
    })   
    nombre!:string;

    @Column({
        type:DataType.STRING(255),
        comment:"Mail del usuario",
        field:"USER_MAIL"
    })
    mail!:string;

    @Column({
        type:DataType.STRING(255),
        comment:"Password encriptado con funcion HASH -Ver documentacion-",
        field:"USER_PASS"
    })
    password!:string;

    @Column({
        type:DataType.ENUM("BY_GOOGLE","BY_FACEBOOK","BY_LOCAL"),
        comment:"Forma de registro en el sistema, y por lo tanto forma de identificarse ante este",
        field:"USER_LOGON_TYPE"
    })
    LogonType!:string;
}
