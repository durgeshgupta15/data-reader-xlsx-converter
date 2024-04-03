const axios = require('axios');
require('dotenv').config();

var fetchData = async function () {
    try {
        const [response1, response2] = await Promise.all([
            axios.get(process.env.URL1),
            axios.get(process.env.URL2)
        ]);

        return {
            res1: response1.data,
            res2: response2.data
        }

    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
}

module.exports = fetchData