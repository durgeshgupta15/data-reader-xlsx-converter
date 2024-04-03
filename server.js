const express = require('express');
const XLSX = require('xlsx');
const fetchData = require('./utils/api');
const { findDifferences } = require('./utils/common');

require('dotenv').config();

const app = express();


// Endpoint to generate and download XLSX file
app.get('/download', async (req, res) => {

    // Example usage
    let fetchedData = await fetchData();
    let differencedData = findDifferences(fetchedData.res1, fetchedData.res2);
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([differencedData.differencesObj1, differencedData.differencesObj2]);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Set headers to force download
    res.setHeader('Content-Disposition', 'attachment; filename="object_data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Write the workbook to the response
    const fileBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.send(fileBuffer);

});







// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
