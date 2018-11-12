import {
    CREATE_CONNECTION,
    DELETE_CONNECTION,
    FETCH_CONNECTIONS,
} from './types';

export const deleteConnection = (id) => {
    return {
        type: DELETE_CONNECTION,
        payload: {
            id
        }
    }
}

export const createConnection = () => {
    return {
        type: CREATE_CONNECTION
    }
}


export const getConnections = () => {
    return {
        type: FETCH_CONNECTIONS
    }
}
