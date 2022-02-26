const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request-promise')

const app = express();
const PORT = process.env.PORT || 5000;

const toy_url = "https://www.amazon.com/Best-Sellers-Toys-Games/zgbs/toys-and-games"
const base_url = "http://www.amazon.com/"

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to Amazon 30 Best Selling Toys Scraper API!')
});

// GET ALL 50 BEST SELLING TOYS
app.get('/all', (req, res) => {
    axios(toy_url)
    .then(response => {
        const html = response.data 
        const $ = cheerio.load(html)
        const lists = []
    
        $('.zg-grid-general-faceout', html).each(function() {
            const title = $(this).text()
            const href = $(this).find('a').attr('href')
            const url = base_url + href
            lists.push({
                title,
                url,
            })
        })
        res.json(lists)
    }).catch(err => console.log(err))
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));