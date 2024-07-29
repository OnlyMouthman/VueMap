var timeLineStartYear;
var timeLineEndYear;

var timeLineArray = [];
var recordArray = [];
var timeLineArrayTemp = [];
var timeLineArray2 = []
export function initData() {
  timeLineStartYear = null;
  timeLineEndYear = null;
  timeLineArray = [];
  recordArray = [];
  timeLineArrayTemp = [];
  timeLineArray2 = [];
}
export function sortData(data) {
  //先整理成一維陣列
  sortOneDimensionalArray(data);
  
  //再整理成timeline要用的陣列
  sortTwoDimensionalArray();

  //最後一次整理
  //setFinalData();
}
function sortOneDimensionalArray(data) {
 
  for (var i = 0; i < data.length; i++) {
    var item = {};
    item["Id"] = data[i]["Id"];
    item["Chinese"] = data[i]["Chinese"];
    item["English"] = data[i]["English"];
    item["StartYear"] = data[i]["StartYear"];
    item["StartIsCentury"] = data[i]["StartIsCentury"];
    item["EndYear"] = data[i]["EndYear"];
    item["EndIsCentury"] = data[i]["EndIsCentury"];
    item["Describe"] = data[i]["Describe"];
    item["Geo"] = data[i]["Geo"];
    item["TagChinese"] = data[i]["TagChinese"];
    item["TagEnglish"] = data[i]["TagEnglish"];
    item["Level"] = data[i]["Level"];
    item["TagId"] = data[i]["TagId"];
    if (data[i]["StartYear"] != null && data[i]["EndYear"] != null) {
      timeLineArrayTemp.push(item);
    }
    if (data[i]["child"] != null) {
      sortOneDimensionalArray(data[i]["child"]);
    }
  }
  
}
function sortTwoDimensionalArray() {
  timeLineStartYear = timeLineArrayTemp[0]["StartYear"];
  timeLineEndYear = timeLineArrayTemp[0]["EndYear"];

  for (var i = 0; i < timeLineArrayTemp.length; i++) {
    var item = timeLineArrayTemp[i];
    var startYear = item["StartYear"];
    var endYear = item["EndYear"];
    if (timeLineStartYear > startYear) timeLineStartYear = startYear;
    if (timeLineEndYear < endYear) timeLineEndYear = endYear;

    setTimeLineArray(item, 0);
  }
  for (var i = 0; i < timeLineArray.length; i++){
    var endYear = timeLineStartYear;
    for(var j = 0; j < timeLineArray[i].length; j++){
        var item = timeLineArray[i][j];
        item["yearWidth"] = (item["EndYear"] - item["StartYear"]) * 2;
        item["yearMarginLeft"] = (item["StartYear"] - endYear) * 2;
        endYear = item["EndYear"];
    }
  }
}
function setTimeLineArray(array, level) {
  var startYear = array["StartYear"];
  var endYear = array["EndYear"];
  if (recordArray[level] == null) {
    recordArray.push(endYear);
    timeLineArray.push([]);
    timeLineArray[level].push(array);
  } else if (recordArray[level] <= startYear) {
    recordArray[level] = endYear;
    timeLineArray[level].push(array);
  } else {
    setTimeLineArray(array, level+1);
    return;
  }
  
}
export function setFinalData(){
    var arrayLength = timeLineArray.length;
    
    var startYear = timeLineStartYear -100;
    var endYear = timeLineEndYear + 100;
    var count = parseInt((endYear - startYear) / 100)
    
    timeLineArray2 = Array.from({ length: arrayLength }, () =>
        Array.from({ length: count }, (_, i) => [5,0,0] )
      )
    //一次檢查一層timeLineArray [-1750,2320] [50, 70] 
    for(var i = 0; i < arrayLength; i++){
        for(var j = 0; j < timeLineArray[i].length; j++){
            var data = timeLineArray[i][j];
            if(data != null){
                var s = data["StartYear"];
                var e = data["EndYear"];
                var ss = parseInt((s-startYear)/100);
                var ee = parseInt((e-startYear)/100);
                for(var k = ss; k < ee+1; k++){
                    timeLineArray2[i][k] =  [0,5,0, data["Chinese"]];
                }
            }
        }
    }
}
export function getStarYear() {
  return timeLineStartYear;
}
export function getEndYear() {
  return timeLineEndYear;
}
export function getTimeLineArray() {
  return timeLineArray;
}
export function getTimeLineArray2() {
    return timeLineArray2;
  }