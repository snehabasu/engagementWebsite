# Engagement Party Website

A beautiful, responsive website for your engagement party with RSVP functionality that saves responses to Google Sheets.

## Features

- **Home Page**: Welcome message and celebration announcement
- **Events & Details Tab**: Date, time, venue, schedule, and event information
- **RSVP Tab**: Interactive form for guests to confirm attendance
- **Google Sheets Integration**: All RSVP responses are automatically saved to a Google Sheet
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## Setup Instructions

### 1. Customize the Website

Edit `index.html` to personalize your engagement party details:


- Update event date, time, and venue information
- Add your specific schedule and timings
- Customize dress code and additional information

### 2. Set Up Google Sheets Integration

To connect the RSVP form to Google Sheets, follow these steps:

#### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Engagement Party RSVPs" (or any name you prefer)
4. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Phone`
   - E1: `Attendance`
   - F1: `Number of Guests`
   - G1: `Dietary Restrictions`
   - H1: `Message`

#### Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy and paste the code from `google-apps-script.js` (provided below)
4. Click **Save** (disk icon)
5. Click **Deploy > New deployment**
6. Click the gear icon next to "Select type" and choose **Web app**
7. Configure the deployment:
   - Description: "RSVP Form Handler"
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy**
9. **Authorize access** when prompted (you may see a warning - click "Advanced" and "Go to [project name]")
10. **Copy the Web App URL** - this is important!

#### Step 3: Update Your Website

1. Open `script.js`
2. Find the line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';`
3. Replace `'YOUR_GOOGLE_SCRIPT_URL'` with the URL you copied in Step 2
4. Save the file

### 3. Deploy Your Website

You can deploy this website using any of these methods:

#### Option 1: GitHub Pages (Free)
1. Push this code to a GitHub repository
2. Go to repository Settings > Pages
3. Select the main branch as source
4. Your site will be published at `https://[username].github.io/[repo-name]`

#### Option 2: Netlify (Free)
1. Go to [Netlify](https://www.netlify.com)
2. Drag and drop your website folder
3. Your site will be live instantly

#### Option 3: Vercel (Free)
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click

## Files Included

- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - Tab functionality and form submission
- `google-apps-script.js` - Script to connect form to Google Sheets
- `README.md` - This file

## Customization Tips

### Colors
The website uses a romantic pink color scheme. To change colors, edit these CSS variables in `styles.css`:
- `#d4a5a5` and `#c89595` - Main accent colors (used in header, buttons, etc.)
- `#ffeef8` and `#fff5f7` - Background gradient colors

### Fonts
The default font is Georgia (serif). To change it, update the `font-family` in `styles.css`.

### Adding More Tabs
1. Add a new button in the `<nav class="tabs">` section in `index.html`
2. Add corresponding `<section>` with matching ID
3. The JavaScript will automatically handle the tab switching

## Testing the RSVP Form

Before sharing with guests:
1. Complete the setup steps above
2. Fill out the form on your website
3. Check your Google Sheet to confirm the data appears
4. Test on mobile devices to ensure responsiveness

## Support

For issues or questions about:
- Google Apps Script setup: Check the [Apps Script documentation](https://developers.google.com/apps-script)
- Website hosting: Refer to your hosting provider's documentation

## License

Free to use and customize for your personal engagement party!

---

**Congratulations on your engagement!** 🎉
