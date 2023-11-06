let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name: '김사과',
        email: 'apple@apple.com',
        url: 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
    }
]

export async function getUsers(){
    return users;
}

export async function getUsersByUsername(username){
    return users.find((user) => user.username === username);
}


export async function create(username, password, name, email){
    const data = {
        username,
        password,
        name,
        email,
        createAt: Date.now().toString(),
        url: "https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg"
    };
    users = [data, ...users];
    console.log(users);
    return users;
}

export async function getPw(username){
    const user = users.find((user) => user.username === username);
    if(user){
        return user.password
    }
    return '-1'
}