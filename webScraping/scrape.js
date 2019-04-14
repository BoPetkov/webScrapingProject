const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const Model = require('./model');
const DB = require('./db');

let kplinks = new Map([
  ['film', 'film-i-tv'],
  ['muzika', 'muzika'],
  ['knigi', 'knigi'],
]);

let cblinks = new Map([
  ['film', 'film'],
  ['muzika', 'muzika'],
  ['knigi', 'knigi'],
]);

let srekalinks = new Map([
  ['film', 'filmovi-i-serii'],
  ['muzika', 'muzika'],
  ['knigi', 'knigi'],
]);

 const field = {};

let keyWords = ['film', 'muzika', 'knigi'];

keyWords.forEach(element => {

    request('https://www.crnobelo.com/novosti/' + cblinks.get(element), (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const content = $('.item');

            $('.item').each((i, el) => {

                const field = {};

                const link = $(el).find('a').attr('href'); 
                const image = $(el).find('img').attr('src');
                const title = $(el).find('h2').text(); 
                const description = $(el).find('p').text();
            
                field.link = 'https://www.crnobelo.com/novosti/' + cblinks.get(element) + link;
                field.image = 'https://www.crnobelo.com/novosti/' + cblinks.get(element) + image;
                field.title = title.trim();
                field.description = description.trim();
                field.categories = element;

                DB.connection.sync({force:false}).then(function () {
                    Model.firstTable.create(field);
                })

            });
            
        }
    });

    request('https://www.kafepauza.mk/category/' + kplinks.get(element), (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const content = $('.blog-content-wrapper');

            $('.blog-media-wrapper').each((i, el) => {

                const field = {};

                const link = $(el).find('a').attr('href'); 
                const image = $(el).find('img').attr('src');
                const title = $(el).parent().find('.blog-title').text();
                const description = $(el).parent().find('.blog-content').text();
            
                field.link = link;
                field.image = image;
                field.title = title.trim();
                field.description = description.trim();
                field.categories = element;

                DB.connection.sync({force:false}).then(function () {                
                    Model.firstTable.create(field);
                })

            });
        }
    });

    request('https://srekja.mk/category/slobodno-vreme-i-zabava/' + srekalinks.get(element), (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            $('.feature-two-column').each((i, el) => {

                const field = {};

                const link = $(el).find('div.image_post a').attr('href'); 
                const image = $(el).find('div.image_post img').attr('src');
                const title = $(el).find('h3.image-post-title').text();
                const description = $(el).find('p').last().text();

                field.link = link;
                field.image = image;
                field.title = title.trim();
                field.description = description.trim();
                field.categories = element;

                DB.connection.sync({force:false}).then(function () {
                    Model.firstTable.create(field);
                })

            });
            
        }
    });
        
});