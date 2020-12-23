'use strict';
var express = require('express');
var router = express.Router();
// Get the path for srticles
var articlesModel = require('../models/articles');
// Get access requirment for using npms
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

// I installed npm nodemailer and here we create a variable as require nodemailer to use it.
var nodemailer = require('nodemailer');

/* GET homepage page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Home Page' });
});

/* GET about_me page. */
router.get('/about_me', function (req, res) {
    res.render('about_me', { title: 'About Me' });
});

/* GET contact page. */
router.get('/contact', function (req, res) {
    res.render('contact', { title: 'Contact Me' });
});

/* POST contact page. After fill out the file and submit,
 * server (Hostinger) will be called and send the information 
 * to my email (meisam.koohaki@gmail.com)*/
router.post('/send', (req, res) => {

    console.log(req.body);

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.emailaddress}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport / I have an account in Hostinger, then I used that.
    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false,
        auth: {
            user: 'mkoohaki.online@mkoohaki.online', // generated ethereal user
            pass: 'hostMK64656465'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: true
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Portfolio Web Page" <mkoohaki.online@mkoohaki.online>', // sender address
        to: 'meisam.koohaki@gmail.com', // email of receiver
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => { 
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        //res.render('contact', { msg: 'Email has been sent' });
        res.render('contact', { title: 'EMAIL SENT, THANK YOU' });
    });
});// end of Post


/* GET projects_page page. */
router.get('/projects_page', function (req, res) {
    res.render('projects_page', { title: 'Projects Page' });
});

/* GET services_page page. */
router.get('/services_page', function (req, res) {

    try {
        //Retrieve all articles if there is any 
        articlesModel.find({}, function (err, foundArticles) {
            console.log(err);
            console.log(foundArticles);
            //Pass found articles from server to pug file
            res.render('services_page', {title: 'Services Page', articles: foundArticles });
        });
    } catch (err) {
        console.log(err);
        res.render('services_page', { title: 'Services Page' });
    }
});


/* POST for save articles on database (mongodb) in services_page page */
router.post('/services_page', function (req, res) {
    //Create a new article using the Articles Model Schema
    const article = new articlesModel({ name: req.body.name, order: req.body.order, description: req.body.description });

    //Insert article into DB
    article.save(function (err) {
        console.log('Inserting!');
        res.redirect('/services_page');
    });
});

/* POST for upload in services_page - Files will save in the /public/images/client_images*/
router.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public/images/client_images');
    form.parse(req, function (err, fields, files) {
        //Update filename
        files.upload.name = fields.title + '.' + files.upload.name.split('.')[1];
        console.log(files.upload.name);
        //Upload file on our server
        fs.rename(files.upload.path, path.join(form.uploadDir, files.upload.name), function (err) {
            if (err) console.log(err);
        });
        console.log('Received upload');
    });
    form.on('end', function (err, fields, files) {
        console.log('File successfuly uploaded');
        res.redirect('/services_page');
    });
});

/* GET service_page_update page */
router.get('/services_page_update/:id', function (req, res) {
    articlesModel.findById(req.params.id, function (err, foundArticles) {
        if (err) console.log(err);
        //Render update page with specific article
        res.render('services_page_update', { title: 'Services Page Update', article: foundArticles });
    });
});

/* POST service_page_update page */
router.post('/services_page_update', function (req, res) {
    console.log(req.body.id);
    //Find and update by id
    articlesModel.findByIdAndUpdate(req.body.id, { name: req.body.name, order: req.body.order, description: req.body.description }, function (err, model) {

        console.log(err);
        res.redirect('/services_page');
    });
});

/* POST delete */
router.post('/delete/:id', function (req, res) {
    //Find and delete article
    articlesModel.findByIdAndDelete(req.params.id, function (err, model) {
        res.redirect('/services_page');
    })
});

/* GET about_me page. */
router.get('/about_me', function (req, res) {
    res.render('about_me', { title: 'About Me' });
});

module.exports = router;
