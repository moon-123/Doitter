import * as tweetRepository from '../data/tweet.js';
import * as tweetAuth from '../data/auth.js';
import bcrypt from "bcrypt";

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




export async function getUsers(req, res){
    const data = await tweetAuth.getUsers()
    console.log(data);
    res.status(200).json(data);
}


export async function joinTweet(req, res, next){
    const {username, password, name, email} = req.body;
    const isUser = await tweetAuth.getUsersByUsername(username);
    if(!isUser){
        const result = await tweetAuth.create(username, bcrypt.hashSync(password, 10), name, email);
        if(result){
            res.status(204).json({message: `Join Success! username: ${username}`})
        }
        else{
            res.status(404).json({message: `Join Failed.. Try Again`});
        }
    }
    else{
        res.status(404).json({message: `username \'${username}\' is already exist`});
    }
}

export async function loginTweet(req, res){
    const {username, password} = req.body;
    const hashedPw = await tweetAuth.getPw(username);
    const result = bcrypt.compareSync(password, hashedPw)
    if(result){
        res.status(200).json({message: `Login Success! welcome ${username}!`});
    }
    else{
        res.status(404).json({message: `Login Failed..`});
    }
}