// function doGet(e) {
//   var htmlOutput =  HtmlService.createTemplateFromFile('save_url');  
//   var pictures = getPictures();  
//   htmlOutput.pictures = pictures;
//   return htmlOutput.evaluate();
// }

function doGet(){
  return HtmlService.createHtmlOutputFromFile('save_url');
}

function getPictures()
{
    var destination_id = '1AgcFZBYJMIQh_r_tbgJBN9wPf70KcmgI';  // ID OF GOOGLE DRIVE DIRECTORY;
    var destination = DriveApp.getFolderById(destination_id);
    
    var files = destination.getFiles();
    var file_array = [];
    
    while (files.hasNext()) 
    {
      var file = files.next();
      file_array.push(file.getId());
    }

    return file_array;
}

function adderFile(data){
  const myFile = Utilities.newBlob(Utilities.base64Decode(data.data),data.mimeType,data.fileName);
  // alert("data"+data.data+data.mimeType+data.fileName)
  const id = '1AgcFZBYJMIQh_r_tbgJBN9wPf70KcmgI';
  const sid = '1ZMTTu6S1Q6eP48rElF5afbNtjQidIzcup0UJsdPWmH0';
  const folder = DriveApp.getFolderById(id);
  const fileAdded = folder.createFile(myFile);
  const ss = SpreadsheetApp.openById(sid).getSheetByName('data');
  ss.appendRow([fileAdded.getUrl(),data.fileName,data.mimeType,fileAdded.getId()]);
  const rep = {
    'url' : fileAdded.getUrl(),
    'name' : data.fileName
  };
  return rep;
}
