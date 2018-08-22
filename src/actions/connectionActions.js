import {
    CREATE_CONNECTION,
    DELETE_CONNECTION,
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
