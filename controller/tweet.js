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
    const { text, name, username } = req.body;
    const data = await tweetRepository.create( text, name, username )
    res.status(201).json(data);
}

export async function updateTweet(req, res){
    const id = req.params.id
    const text = req.body.text;
    const data = await tweetRepository.update(id, text);
    if(data){
        res.status(200).json(data);
    }
    else{
        res.status(404).json({message: `There is No id: ${id}`});
    }
}

export async function deleteTweet(req, res){
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
}
