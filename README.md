
# Income-Expense Web Application

Are you tired of manually crunching numbers, fumbling with calculators, and struggling to keep your finances organized? Look no further than our Web App, the ultimate solution to streamline your financial record-keeping.

## How does it work?

It's a web application designed to streamline the management of your finances by allowing you to effortlessly record and calculate both your income and expenses. With this app, you can perform numerical calculations without the need for a separate calculator. Moreover, as you input your financial data, simply press a button, and the information will be seamlessly transmitted to the custom google sheet form you've created.


![App Screenshot](https://cdn.pic.in.th/file/picinth/In-Web.png)


## How to add script into google sheet

![App Screenshot](https://cdn.pic.in.th/file/picinth/-136ff3362137c5396.png)

![App Screenshot](https://cdn.pic.in.th/file/picinth/-2c3d15e479b027ed5.png)

![App Screenshot](https://cdn.pic.in.th/file/picinth/8f292cbb132ae9f739ca676ee3673569.png)

![App Screenshot](https://cdn.pic.in.th/file/picinth/-4b2dbe554e26d31b1.png)

The last Step, Add your url in file(script.js)
![App Screenshot](https://cdn.pic.in.th/file/picinth/-3f020144318232a43.png)


## App Script

Add Script in App Script

```bash
var sheetName = 'put your name sheet that is at taskbar';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}

```
    
## I hope it will be useful for anyone

Thanks for use it :smile:

