module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: 'cascade',
        })
    };

    /*
        - Đoạn mã này sử dụng Sequelize để tạo một mối quan hệ "một-nhiều" giữa bảng "Posts" và bảng "Comments". 
        Khi sử dụng hasMany trong Sequelize như trong đoạn mã, thư viện này thường sẽ tự động thêm một trường 
        khóa ngoại (foreign key) vào bảng mục tiêu, tức là bảng "Comments" trong trường hợp này.
        - Thiết lập cách xử lý khi một bài đăng (Post) bị xóa. Trong trường hợp này, khi một bài đăng bị xóa, 
        tất cả các bình luận liên quan đến bài đăng đó cũng sẽ bị xóa theo chiều sâu (cascade).
    */

    return Posts;
}