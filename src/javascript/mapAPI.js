import axios from 'axios';
var ApiUrl = "http://192.168.100.171/MapAPI/api/Geometry/"


export function searchName(searchName){
    //http://localhost/MapAPI/swagger/index.html
    
    return new Promise((resolve) => {
        axios.get(ApiUrl + 'SearchName?search='+searchName)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                resolve(error);
            });
    });
    //return searchName;
}

