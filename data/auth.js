let users = [
    {
        id: '1',
        username: 'apple',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name: '김사과',
        email: 'apple@apple.com',
        url: 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
    },
    {
        id: '2',
        username: 'banana',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name: '반하나',
        email: 'banana@banana.com',
        url: 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
    }
]

export async function getUsers(){
    return users;
}

export async function findByUsername(username){
    return users.find((user) => user.username === username);
}

export async function findById(id){
    return users.find((user) => user.id === id);
}

export async function createUser(user){
    const created = { ...user, id:'1'};
    users.push(created); // push 함수 사용.
    return created.id;
}

