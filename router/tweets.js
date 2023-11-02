import express from "express";

const router = express.Router();

// GET / tweets
// GET / tweets?username=:username
router.get("/", (req, res, next) => {
    const username = req.query.username;
    const data = username
        ? tweets.filter((tweet) => tweet.username === username)
        : tweets;
    res.status(200).json(data);
})
// GET / tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet){
        res.status(200).json(tweet);
    }
    else{
        res.status(404).json({message: `Tweet id(${id}) Not found`});
    }
})
 
// filter를 사용하면 여러개를 반환 가능
// find를 사용하면 반복문을 직접 돌리지 않아도 됨

// POST / tweets
router.post('/', (req, res, next) => {
    const { text, name, username } = req.body;
    const tweet = {
        id:'10',
        text,
        createdAt: Date.now().toString(),
        name,
        username
    };
    tweets = [tweet, ...tweets];
    res.status(201).json(tweets);
});

// js는 obj에 key와 value가 같으면 하나를 생략할 수 있다.


// PUT / tweets/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const text = req.body.text;
    let tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
        res.sendStatus(204);
    }
    else{
        res.status(404).json({message: `There is No id: ${id}`})
    }
});

// DELETE / tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    tweets = tweets.filter((tweet) => tweet.id !== id);
    res.sendStatus(204);
})
export default router;
 
