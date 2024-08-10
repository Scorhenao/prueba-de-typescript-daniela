import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    HasMany,
    AfterCreate
} from 'sequelize-typescript';
import { RoleModel } from './roleModel';

@Table({
    tableName: "users",
    timestamps: true
})

export class UserModel extends Model<UserModel>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;

    @ForeignKey(() => RoleModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roleId!: number;
}