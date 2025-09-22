import SQLite from 'react-native-sqlite-storage';


SQLite.enablePromise(true);
SQLite.DEBUG(false);

const DB_NAME = 'forca-de-vendas.db';

export const openDb = async() => {
    return SQLite.openDatabase({ name: DB_NAME, location: 'default' });
}