import { Table, Column, Model, DataType, Default, Comment, Unique } from 'sequelize-typescript'
@Table({})
class User extends Model<User> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    public id: number

    // @Column({
    //     type: DataType.CHAR,
    // })
    // public mobile: string

    // @Column({
    //     type: DataType.CHAR,
    // })
    // public password: string

    // @Column({
    //     type: DataType.CHAR,
    // })
    // public realname: string

    // @Column({
    //     type: DataType.CHAR,
    // })
    // public avatar: string
}
export default User
