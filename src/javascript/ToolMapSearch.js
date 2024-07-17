import * as mapAPI from "../javascript/mapAPI.js"

export async function Search(map, searchName){
    var data = await mapAPI.searchName(searchName)
    for(var i = 0; i < data.data.length; i++){
        var item = data.data[i]["Geo"];
        if(item["type"] == "Point"){
            L.marker([item["coordinates"][0], item["coordinates"][1]]).addTo(map);
        }
    }


    console.log(data)
}
