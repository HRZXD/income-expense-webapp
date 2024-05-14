
# Income-Expense Web Application

Are you tired of manually crunching numbers, fumbling with calculators, and struggling to keep your finances organized? Look no further than our Web App, the ultimate solution to streamline your financial record-keeping.

## How does it work?

It's a web application designed to streamline the management of your finances by allowing you to effortlessly record and calculate both your income and expenses. With this app, you can perform numerical calculations without the need for a separate calculator. Moreover, as you input your financial data, simply press a button, and the information will be seamlessly transmitted to the custom google sheet form you've created.

![income-expense-interface](https://github.com/HRZXD/income-expense-webapp/assets/98503935/aaee25c1-f87d-4540-83fd-652cf3d0bd15)

## How to add script into google sheet

![First Step](https://github.com/HRZXD/income-expense-webapp/assets/98503935/3b5ef9c6-0c69-4696-b72a-7360bed1c00a)

![Second Step ](https://github.com/HRZXD/income-expense-webapp/assets/98503935/2ab253b0-618f-4277-9c1b-60c918888202)

![Third Step](https://github.com/HRZXD/income-expense-webapp/assets/98503935/2ec7ab76-8623-4292-be60-8b710ac19eae)

![Last Step](https://github.com/HRZXD/income-expense-webapp/assets/98503935/7621564e-dd01-4acb-98ed-8f7037da8c3e)

The last Step, Add your url in file(script.js)

![last last](https://github.com/HRZXD/income-expense-webapp/assets/98503935/8abdb3a7-8054-41bb-ba39-1a91729e3d8e)

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

Some Code is from Kongraksiam Studio
Thanks for use it :smile:

