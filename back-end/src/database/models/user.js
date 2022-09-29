const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, { timestamps: false, freezeTableName: true, tableName: 'users', underscored: true });
  return UserTable;
};

module.exports = UserSchema;
