/** @OnlyCurrentDoc */
function onOpen() 
{
  var ui = SpreadsheetApp.getUi();

  //Or DocumentApp or FormApp.
  ui.createMenu('Actions')
      .addItem('Fake Teams', 'filter')
      .addSeparator()
      .addItem('Send Invitation Email', 'sendEmail')
      .addSeparator()
      .addItem('Send Events Invitations', 'emailsInvitation')
      .addSeparator()
      .addItem('Send Meeting Invitations', 'emailsMeeting')
    .addToUi();
}

function filter()
{
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getActiveSheet();
      var last = ss.getActiveSheet();
      var dataMaster = sheet.getDataRange().getValues();
      var filterCols = ['Sample Team1',	
                          'Sample Team2',	
                          'Sample team3'
                       ];
      var sheetNameCommunications = "Sample Team1";
      var sheetNamePolitical = "Sample Team2";
      var sheetNameMembership = "Sample Team3";
      var sheetsFilteredListNames = [sheetNameCommunications, sheetNameMembership, sheetNamePolitical]
      var columnDict = {
                          "Communication Team" : 'fake column1',	
                          "Membership Team" : 'fake column2',	
                          "Political Team" : 'fake column3'
                       };
      var headers = getRowData(sheet, 0);
      var sheets = ss.getSheets();
      var sheetList = [];
      ss.getSheets().forEach(function(val){ sheetList.push(val.getName()) });
      for (var i =0; i < sheetsFilteredListNames.length; i++)
      {
        if (sheetList.indexOf(sheetsFilteredListNames[i]) !== -1)
        {
            var thisSheet = ss.getSheetByName(sheetsFilteredListNames[i]);
            ss.deleteSheet(thisSheet);
        } 
      }
    
    //for(var i = 0; i < sheetsFilteredListNames.length; i++)
    for (const [key, value] of Object.entries(columnDict))
    {
        var sheetName = key;  //sheetsFilteredListNames[i];
        //Logger.log('Communication: ' + key);
        ss.insertSheet(sheetName);
        var sheetTemp = ss.getSheetByName(sheetName);
        
        
        //Set the range of cells
        var range = sheetTemp.getRange(1, 1,1, headers.length);
        //Logger.log('Communication: ' + headers);
        //Call the setValues method on range and pass in our values
        range.setValues([headers]);
        sheetTemp.setFrozenRows(1);
        var dataMaster = sheet.getDataRange().getValues();
        dataFilter = []
        
        for(var i = 1; i < dataMaster.length; i++)
        {
            //Logger.log('Communication: ' + dataMaster[i][18]);
            //if (dataMaster[i][18] == '1')
            var colName = columnDict[key]; 
            var dataMasterValCell = getColumnValuesByName(sheet, colName, i);
            if (dataMasterValCell == '1')
            {
              var dataMasterValRows = getRowData(sheet, i);
              dataFilter.push(dataMasterValRows);
            }
            //Logger.log('Data:' + dataMasterVal);
            //Logger.log('Communication: ' + dataMasterVal);
            //{
              //dataComm.push(dataMaster[i]);
              //Logger.log('Communication: ' + dataMaster[i][18]); //
            //}
        }/**/
        //Logger.log('Data:' + dataMasterVal);
        sheetTemp.getRange(sheetTemp.getLastRow()+1, 1, dataFilter.length, dataFilter[0].length).setValues(dataFilter);
    }
    SpreadsheetApp.getUi().alert('Done Filtering Teams!');
}

function getRowData(sheet, rowNum)
{
  var data = sheet.getDataRange().getValues();
  return data[rowNum];
}

function getColumnValuesByName(sheet, colName, row) 
{
    //var sheet = SpreadsheetApp.getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var col = data[0].indexOf(colName);
    if (col != -1) 
    {
      return data[row-1][col];
    }
}

function emailsMeeting()
{
    SpreadsheetApp.getUi().alert('Opps! This function is currently under construction');
}

function emailsInvitation()
{
      SpreadsheetApp.getUi().alert('Opps! This function is currently under construction');
}
