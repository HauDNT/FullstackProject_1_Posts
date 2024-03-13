module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Tạo thêm thuộc tính username cho bảng Comment:
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Comments;
}