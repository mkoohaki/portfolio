const express = require('express');
const router = express.Router();

//Getting link address of js pdfmakers
const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');

pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post('/pdf', (req, res, next)=>{
    //res.send('PDF');

    //Get the values of parameters in the form of pdf creating
    const fname = req.body.fname;
    const lname = req.body.lname;

    //Content of the pdf (hard text)
    var documentDefinition = {
        content: [
            `Hello ${fname} ${lname}` ,
            'This web page portfolio has written in full-stack JavaScript solution that comprises four major building blocks:',
            '- MongoDB as the database',
            '- Express as the web server framework',
            '- AngularJS as the web client framework',
            '- .js as the server platform.',
            'But I have not used Angular in this web application yet',
            'This is connected to mongoDB to save the customers\' orders',
            'When the visitor leave a message in contact page it will connected to the Hostinger server, and send the message, name, and email to my gmail address',
            'There is some sample projects that I did in college. Some of them are local files and some of them are live links, you can see those by clicking on them',
            'This is the structure of this web application (Meisam Koohaki Portfolio):',

				'I have added some npms:',
					'- mongodb : Connecting to mongodb as database',
					'- mongoose : Save data on mongodb as database',
					'- nodemailer : Connecting to the host: \'smtp.hostinger.com\' in Hostinger as server',
					'- pdfmake : Using for make the pdf file',
					'- formidable : Using for upload the file',
					'- fs : using for file selecting - used in file uploading',

				'I created some new files and folders:',
					'- models / articles.js : For saving data in database',
					'- pdfmake / pdfmake.js : for making pdf',
					'- pdfmake / vfs_fonts.js : for making pdf - choosing font',
					'- public',
					'- css',
						'- /pizza_store/pizza_store_style.css : For styling pizza store web page used in projects_page.pug',
						'- /song_page/song_page_style.css : For styling song web page used in projects_page.pug',
						'- /supreme/supreme_style.css : For styling supreme web page used in projects_page.pug',
						'- /tintin/tintin_style.css : For styling tintin web page used in projects_page.pug',
					'- html',
						'- pizza_store',
							'- pizza.html                  |',
							'- pizzaOrderPage.html         |',
							'- legal / privacy-policy.html | For pizza store web page used in projects_page.pug',
							'- legal / terms-of-use.html   |',
						'- song_page / song_page.html : For song web page used in projects_page.pug',
						'- supreme',
							'- supreme - contact.html        |',
							'- supreme - home.html           |',
							'- supreme - order.html          |',
							'- supreme - others.html         |',
							'- supreme - shirt.html          | For supreme web page used in projects_page.pug',
							'- supreme - sheos.html          |',
							'- supreme - stone - island.html |',
							'- supreme - sweatshirt.html     |',
							'- legal / privacy-policy.html |',
							'- legal / terms-of-use.html |',
						'-/tintin/index.html : For tintin web page used in projects_page.pug',
					'- images',
						'- main : pics for main web page(Meisam Koohaki Portfolio',
						'- pizza_store_img : pics for pizza store web page',
						'- song_page_img : pics for song web page',
						'- supreme_img : pics for supreme web page',
						'- tintin_img : pics for tintin web page',
						'- client_images : save uploaded pics by filling out the form in the services_page.pug page',
					'- javascript / main.js : a js file for in web page(Meisam Koohaki Portfolio)',
					'- sound / song_page_sound / Eagles - HotelCalifornia.mp3 : music for song web',
					'- routes / pdfmake.js : a js file for making pdf.When user click on CREATE button in services_page.pug, this file reacts',
					'- views',
						'- partials / footer.pug : this file make the footer of all pages of main web page',
						'- partials / header.pug : this file make the header of all pages of main web page',
						'- about_me.pug     |',
						'-contact.pug       |',
						'-error.pug         | apages of main web ',
						'- index.pug        |',
						'-projects_page.pug |',
						'-services_page.pug |',
						'_services_page_update.pug : a page which open when user wants to edit a data in the table in service_page.pug'
		]        
    };

    //Create a PDF file with a constant name
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200, 
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="MeisamKoohakiPortfolio.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
		res.end(download);
    });
});


module.exports = router;