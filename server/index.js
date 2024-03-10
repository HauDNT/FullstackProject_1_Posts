const express = require('express');
const app = express();
const port = 3001;
const db = require('./models');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Routers:
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server's running on port ${port}`);
    });
});