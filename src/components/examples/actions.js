import axios from "axios";

// All aJax requests will go from this file
export function getListOfAnimals(){
    return axios.get('/get-list-animals').then(({ data }) => {
        return {
            type: 'ADD_LIST_ANIMALS',
        };
    });
}