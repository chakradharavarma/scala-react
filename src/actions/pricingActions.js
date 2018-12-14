import {
    GET_COMPUTE_COST,
} from './types';

export const getComputeCost = (region, instanceType) => {
    return {
        type: GET_COMPUTE_COST,
        payload: {
            region,
            instanceType
        }
    }
}
