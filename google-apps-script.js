/**
 * Google Apps Script for Engagement Party RSVP Form
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Copy and paste this entire code
 * 4. Save the project
 * 5. Deploy as Web App (Deploy > New deployment)
 * 6. Set "Execute as" to "Me" and "Who has access" to "Anyone"
 * 7. Copy the Web App URL and paste it in script.js
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Prepare row data matching the column order
    const rowData = [
      data.timestamp || new Date().toLocaleString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.attendance || '',
      data.guests || '',
      data.dietary || '',
      data.message || ''
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Optional: Send confirmation email to the couple
    // Uncomment and customize the following lines if you want email notifications
    /*
    MailApp.sendEmail({
      to: 'your-email@example.com',
      subject: 'New RSVP Received',
      body: `New RSVP from ${data.name}\n\nAttendance: ${data.attendance}\nGuests: ${data.guests}\n\nView all RSVPs: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`
    });
    */

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'RSVP submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function doGet(e) {
  return ContentService.createTextOutput('RSVP Form Handler is active!');
}
