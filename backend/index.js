const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');


const userRouter = require('./routers/UserRouter');
const postRouter = require('./routers/PostRouter');
const communityRouter = require('./routers/CommunityRouter');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/community', communityRouter);

app.get('/', (req, res) => {
    res.send('response from express');
});

app.get('/add', (req, res) => {
    res.send('responce from add');
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})