import axios from 'axios';
//var ApiUrl = "http://192.168.100.171/MapAPI/api/Geometry/"
const ApiUrl = import.meta.env.VITE_API_URL;
const NominatimUrl = "https://nominatim.openstreetmap.org/search?q=";

///資料庫查資料
export function searchAPIName(searchName){
    return new Promise((resolve) => {
        axios.get(ApiUrl + 'Geometry/SearchName?search='+searchName)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                resolve(error);
            });
    });
    //return searchName;
}

///透過opendata找資料
///資料來源nominatim.openstreetmap.org
export function SearchAPINominatim(searchName){
    return new Promise((resolve) => {
        axios.get(NominatimUrl + searchName + "&format=geojson")
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                resolve(error);
            });
    });
}

export function getHistoryData(){
    return new Promise((resolve) => {
        axios.get(ApiUrl + 'History/SearchTag?LevelId='+4)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                resolve(error);
            });
    });
    //return searchName;
}