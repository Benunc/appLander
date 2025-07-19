function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function logDips(dips) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  const currentDate = new Date();
  
  // Insert new row with the date and dips
  sheet.appendRow([currentDate, dips]);
  
  // Update Running Total
  const dipsColumn = sheet.getRange(2, 2, lastRow, 1).getValues();
  const runningTotal = dipsColumn.flat().reduce((sum, value) => sum + (value || 0), 0);
  
  // Calculate average per day so far
  const daysSoFar = currentDate - new Date(currentDate.getFullYear(), 0, 0);
  const daysInYear = 365; // Assuming it's not a leap year for simplicity
  const averagePerDaySoFar = runningTotal / (daysSoFar / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  console.log('average per day so far: ' + averagePerDaySoFar)
  // Calculate progress relative to goal average
  const goalAverage = 27; // Daily average needed to reach 10,000 in a year
  const progressPercentage = (averagePerDaySoFar - goalAverage);

  // Project year-end total based on current average
  const daysLeft = daysInYear - (daysSoFar / (1000 * 60 * 60 * 24));
  const projectedYearEnd = Math.round(runningTotal + (averagePerDaySoFar * daysLeft));

  // Update Running Total, Progress, and Projected Year-End for the last entry
  sheet.getRange(lastRow + 1, 3).setValue(runningTotal);
  sheet.getRange(lastRow + 1, 4).setValue(progressPercentage);
  sheet.getRange(lastRow + 1, 5).setValue(projectedYearEnd); // Assuming column E for projected total
}

function getProgressPercentage() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length > 1) {
    const lastRow = data[data.length - 1]; // Get the last row of data
    return lastRow[3]; // Assuming the progress percentage is in column D (index 3)
  }
  
  return 0; // Default to 0 if no data
}

function getProjectedYearEnd() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length > 1) {
    const lastRow = data[data.length - 1]; // Get the last row of data
    return lastRow[4]; // Assuming the projected year-end is in column E (index 4)
  }
  
  return 0; // Default to 0 if no data
}

// Keep getRunningTotal() as it is since you'll still want to display the total dips.
function getRunningTotal() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  if (data.length > 1) {
    const lastRow = data[data.length - 1]; // Get the last row of data
    return lastRow[2]; // Assuming the running total is in column C (index 2)
  }
  
  return 0; // Default to 0 if no data
}