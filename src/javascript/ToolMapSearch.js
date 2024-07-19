import * as mapAPI from "./mapAPI.js"

export async function Search(map, searchName){
    var data = await mapAPI.searchAPIName(searchName)
    for(var i = 0; i < data.data.length; i++){
        var item = data.data[i]["Geo"];
        if(item["type"] == "Point"){
            L.marker([item["coordinates"][0], item["coordinates"][1]]).addTo(map);
        } else if(item["type"] == "Polygon"){
            var polygon = L.polygon(item["coordinates"][0], {color: 'red'}).addTo(map);
            map.fitBounds(polygon.getBounds());
        }
    }
}

export async function SearchNominatim(searchName){
    if(searchName == null || searchName == "")return [];
    var data = await mapAPI.SearchAPINominatim(searchName)
    var outputArray = []
    if(data.data != null){
        var features = data.data.features;
        for(var i = 0; i < features.length; i++){
            var item = {
                Name: features[i]["properties"]["name"],
                Describe: features[i]["properties"]["display_name"],
                coordinates: features[i]["geometry"]["coordinates"]
            }
            outputArray.push(item);
        }
    }
    return outputArray;
}

export function SearchNominatimClick(map, tempLayer, item){
    if(tempLayer != null) 
        tempLayer.clearLayers();
    var ll = new L.LatLng(item["coordinates"][1], item["coordinates"][0])
    var marker = L.circleMarker(ll, {
        color: 'blue',
        fillColor: '#30a3e6',
        fillOpacity: 0.5,
        radius: 10
    }).addTo(map);
    tempLayer.addLayer(marker);
    
    map.panTo(ll);
}