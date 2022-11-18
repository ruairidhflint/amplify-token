import Configstore from 'configstore';
const store = new Configstore('amplify-token');
const getKey = (key) => store.get(key);
const setKey = (key, value) => store.set(key, value);
const getStore = () => store.all;
const clearStore = () => store.clear();
export { getKey, setKey, getStore, clearStore };
//# sourceMappingURL=configstore.js.map