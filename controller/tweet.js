import * as tweetRepository from '../data/tweet.js';


export async function getTweets(req, res){
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}

export async function getTweet(req, res){
    const id = req.params.id;
    const data = await tweetRepository.getById(id);
    if (data){
        res.status(200).json(data);
    }
    else{
        res.status(404).json({message: `Tweet id(${id}) Not found`});
    }
}

export async function createTweet(req, res){
    const { text } = req.body;
    const data = await tweetRepository.create( text, req.userId);
    res.status(201).json(data);
}

export async function updateTweet(req, res){
    const id = req.params.id
    const text = req.body.text;
    const tweet = await tweetRepository.getById(id);

    if (!tweet){
        res.status(404).json({message: `There is No id: ${id}`});
    }
    if(tweet.userId !== req.userId){
        return res.status(403).json({message: "본인 글만 수정할 수 있습니다."});
    }
    
    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
}

export async function deleteTweet(req, res){
    const id = req.params.id
    const tweet = await tweetRepository.getById(id);

    if (!tweet){
        res.status(404).json({message: `There is No id: ${id}`});
    }
    if(tweet.userId !== req.userId){
        return res.status(403).json({message: "본인 글만 삭제할 수 있습니다."});
    }

    const del = await tweetRepository.remove(id);
    res.sendStatus(204);
}
 



