const Users = require("../model/usersSchema");

//const Users = require('../model/usersSchema')
let data = [ {
    "id": 1,
    "username": "giorgi",
    "password": "123456",
    "firstname": "giorgi",
    "lastname": "giortgi",
    "day": 3,
    "mounth":3,
    "year": 1900,
    "country": "Georgia"
}];

const getUsers = async() => (data);

const getUsersById = (id) => {
    let temp = data.filter((item) => (item.id == id));
    if(temp.length > 0){
        return temp[0];
    }else{
        return {};
    };
};

const addUsers = async (record) => {
   
    record.id = Date.now();
    data.push(record);
}

const updateUsers = (record) => {
    data.map((item, index) => {
        if(record.id == item.id){
            data[index] = record;
        }
    });
};

const deleteUsers = (id) => {
    let temp = data.filter((item)=>(item.id != id));
    data = temp;

};

module.exports = { getUsers, getUsersById, addUsers, updateUsers, deleteUsers };