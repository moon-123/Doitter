import * as userRepository from './auth.js';

let tweets = [
    {
        id: '1',
        text: '안녕하세요!',
        createdAt: Date.now().toString(),
        userId: '1'
    },
    {
        id: '2',
        text: '반갑습니다!',
        createdAt: Date.now().toString(),
        userId: '2'
    }
];

// filter를 사용하면 여러개를 반환 가능
// find를 사용하면 반복문을 직접 돌리지 않아도 됨
// js는 obj에 key와 value가 같으면 하나를 생략할 수 있다.

export async function getAll() {
    return Promise.all(
        tweets.map(async (tweet) => {
            const { username, name, url } = await userRepository.findById(tweet.userId);
            return { ...tweet, username, name, url};
        })
    );
};


export async function getAllByUsername(username){
    return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
};

export async function getById(id){
    const found = tweets.find((tweet) => tweet.id === id);
    if(!found){
        return null;
    }
    const { username, name, url } = await userRepository.findById(found.userId);
    return { ...found, username, name, url };
};

export async function create(text, userId) {
    const tweet = {
        id:'10',
        text,
        createdAt: Date.now().toString(),
        userId
    };
    tweets = [tweet, ...tweets];
    return getById(tweet.id);
}

export async function update(id, text){  
    let tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
    }
    return getById(tweet.id);
}

export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !== id);
}
