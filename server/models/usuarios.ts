import {Model, DataTypes} from 'sequelize';

export class Usuario extends Model {
    public Id!: number;
    public Nombre!:string;
    public Email!:string;
    public ValidateWithGoogle!:boolean; 
    
    public static Estructura:any={
        Id:{
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true
        },
        Nombre:{
            type:DataTypes.STRING(60),
            allowNull:false
        },
        Email:{
            type:DataTypes.STRING(255),
            uniqueIndex:true
        },
        ValidateWithGoogle: {
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    };
};
