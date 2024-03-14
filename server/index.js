const express = require('express');
const app = express();
const port = 3001;
const db = require('./models');
const cors = require('cors');
const body_parser = require('body-parser');

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use(cors());

// Routers:
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);
const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);
const usersRouter = require('./routes/Users');
app.use('/auth', usersRouter);
const likesRouter = require('./routes/Likes');
app.use('/likes', likesRouter);





db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server's running on port ${port}`);
    });
});