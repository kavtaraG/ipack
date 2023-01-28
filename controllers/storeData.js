var store = [
    {id: 1, name: 'Domestos', origin: 'Turkey', items: '5', price: '6.0 GEL', quantity: '5'}
];

const getStore = () => (store);

const getStoreById = () => {
    let temp = store.filter((item) => (item.id == store.id));
    if(temp.length > 0){
        return temp[0];
    }else{
        return {};
    };
};

const postStore = (record) => {
    record.id = Date.now();
    store.push(record);
};

const putStore = (record) => {
    store.map((item, index) => {
        if(record.id == item.id){
            data[index] = record;
        };
    });
};

const deleteStore = (id) => {
    let temp = store.filter((item) => (item.id != id));
    store = temp;
};



module.exports = { getStore, getStoreById, postStore, putStore, deleteStore };