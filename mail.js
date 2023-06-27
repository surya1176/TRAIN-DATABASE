var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    port : 587, 
    secure : false, 
    requireTLS : true,
    auth: {
    user : 'cse210001041@iiti.ac.in',
    pass : 'oobbmrqhpafsgqjv'
    }
  }); 


  var mailOptions  = { 
    from : 'cse210001041@iiti.ac.in', 
    to: 'cse210001024@iiti.ac.in', 
    subject : 'Hi', 
    text : 'Loss'
  }

  transporter.sendMail(mailOptions,function(error,info){ 
    if(error){ 
        console.log(error);
    }
    else{ 
        console.log("hi");
    }
  })