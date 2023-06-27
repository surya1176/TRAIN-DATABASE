const mysql = require("mysql"); 
const express  = require("express"); 
const app = express(); 
const path =require('path')
const bodyParser = require("body-parser");
const { resolvePreset } = require("@babel/core");
const encoder = bodyParser.urlencoded();  
const cookieParser = require("cookie-parser");
const session = require('express-session');
const { connect } = require("http2");
const bcrypt  = require('bcrypt');
const methodoverride = require('method-override');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodoverride('_method'));
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


app.set('view engine', 'ejs');
app.use(cookieParser());
const oneDay = 10000000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use("/assets",express.static("assets"));
const connection = mysql.createConnection({ 
    host : "localhost", 
    user : "root",
    password : '',
    // password : "$your_password$",
    database : "nodejs"
}); 




connection.connect(function(error){ 
    if(error) throw error
    else console.log("connected to database successfuly!")
}) 

// google oauth
const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '100362439256-hd4hj85kcaqr39mm7von87h6ql2moscm.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });




app.get('/index.html', function(req, res) {
   res.render('index');
});


//app.set('views', path.join(__dirname, 'views'))

app.get("/home",function(req,res){ 
   console.log(req.session);
    if(req.session.bsa){ 
        res.render('index3', {user : req.session.bsa} );
    }
    else{
    // res.sendFile(__dirname + "/index3.html"); 
    res.render('index3');
    }
    
}) 

app.get("/index11.html",function(req,res){ 
    
    res.render('index3', {user : "surya"});

})

// app.get("/index.html",function(req,res){ 
    
//     res.render('index');

// })
app.get("/index10.html",function(req,res){ 
    res.render('index3',{message : "hi"});
    req.session = {}
    console.log(req.session);
})
app.get("/index2.html",function(req,res){ 
    
    res.sendFile(__dirname + "/train/index2.html"); 

}) 
app.get("/index5.html",function(req,res){ 
    
    res.sendFile(__dirname + "/train/index5.html"); 

}) 

app.get("/index6.html",function(req,res){ 
    
    res.sendFile(__dirname + "/train/index6.html"); 

})
app.get("/register.html",function(req,res){ 
   
    res.render('register');

})

app.get("/index.html",function(req,res){ 
    
    res.sendFile(__dirname + "/index.html"); 

})
app.get("/index3.html",function(req,res){ 
    res.sendFile(__dirname + "/train/index7.html")
}) 
var session2;
app.post("/",encoder, async (req,res) =>{
    
    var username = req.body.username;
    var password = req.body.password; 
    
    connection.query("select * from costumer where user_name = ? ",[username],async (error,results,fields) =>{ 
        req.session.bsa = username;
        
        if (results.length >0) { 
           const validpass= await bcrypt.compare(password,results[0].user_pass);
           if(username=="surya"){ 
                 res.render('index4')  
                 }
                 else{
           
                res.render('index3', {user : username} );
                 }
        } else {
           res.render('index',{message : "email/password doesnot match"});
            
        }
        res.end();
    }); 

}); 
app.get("/index12.html",function(req,res){ 
    
    res.sendFile(__dirname + "/train/index7.html"); 

})
app.post("/traindelete",encoder,function(req,res){ 
    var trid = req.body.idt;
    connection.query("select * from costumer where train_id",[trid],function(error,results,fields){ 
        for(var i=0;i<results.length;i++){ 
            var em = results[i].email_id;
            var mailOptions  = { 
                from : 'cse210001041@iiti.ac.in', 
                to: em, 
                subject : 'Cancellation of ticket due to failure', 
                text : 'This mail is to inform you that your booking with happyeasygo has been terminated due to failure. You will be refunded within 2 days.Sorry for the inconvinience caused'
              }
            
              transporter.sendMail(mailOptions,function(error,info){ 
                if(error){ 
                    console.log(error);
                }
                else{ 
                    console.log("hi");
                }
              })
        }
    

})
})

var obj = {} ;
//check this
app.post("/trainupdate",encoder,function(req,res){ 
    var trid = req.body.idt; 
    connection.query("select * from train_stops",function(error1,results1,fields1){ 
        connection.query("select * from stops_at where train_id=?",[trid],function(error,results,fields){ 
        connection.query("select * from train where train_id=?",[trid],function(error2,results2,fields2){ 
      
            
            obj.print3 =results1;
            obj.print2 = results2;
            obj.print = results;
            console.log(obj);
    
            res.render('results',{obj});
            
         
    })
    })
  
})   
        
        
  
    
    
 
}) 
app.post("/re",encoder,async  (req,res)=>{ 
   var name = req.body.name;
   var email = req.body.email;
    var password = req.body.password; 
    var cpassword = req.body.cpassword;
    
    // console.log(password);
    // console.log(cpassword);
    //console.log(req.body);
   if(!password){ 
    res.render('register', {message: "please enter a password"});
   }
   else  if(password != cpassword){
       res.render('register', {message: "password fields are diffrent"});
   } 
   else{  
    password= await bcrypt.hash(password,12);
    connection.query("select * from costumer where email_id = ? ",[email],function(error,results,fields){  
        if (results.length >0) {
        res.render('register', {message: "email id is already registered"});
        } 
        else{
    connection.query("select * from costumer where user_name = ? ",[name],function(error1,results1,fields1){ 
        if (results1.length >0) {
            res.render('register', {message: "username is already taken"});
        } 
        else{
            req.session.bsa = name;
    var sql = "INSERT INTO costumer (user_name,email_id,user_pass,wallet) VALUES (?,?,?,?)";
    connection.query(sql, [name,email,password,1000], function (err, result) {
        if (err) throw err; 

        console.log("Number of records inserted: " + result.affectedRows); 
        res.render('index3', {user : name, emailid : email} );
      });

   } 
});
       
        
  
} 
});

   } 
});
var obj1 ={}
app.post("/ticket",encoder,function(req,res){
  var from =  req.body.from; 
  var to = req.body.to; 
  var date=req.body.date;
  req.session.date = req.body.date; 
  console.log(req.body.date);
  var sql = "SELECT train.train_name AS train_name, train.startlocation AS startlocation, train.endlocation AS endlocation,availability.availid AS availid,availability.travel_date as travel_date, availability.start_time as start_time FROM train JOIN availability ON availability.train_id = train.train_id where train.startlocation = ? and train.endlocation = ? and availability.travel_date= ?";
  connection.query(sql,[from,to,date],function(error,results,fields){
    console.log(results);
    if(results.length>0){ 
    req.session.user = results;
    
    res.render('trains', {message : req.session });
    }
    else{ 
        console.log("loss");
    }
})
})


app.post("/results",function(req,res){ 
    
    var result = (req.session); 
   // console.log(result);
    res.render("submit",{message : result});
})
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})
app.patch("/r",encoder,function(req,res){ 

    var availid = req.body.availid;
    var train_id;
    console.log(availid);
    connection.query("select train_id from availability where availid = ? ",[availid],async (error,results1,fields) =>{
        console.log("lousa");
        console.log(availid);
        console.log(results1);
       train_id= results1[0].train_id;
    });
    console.log(train_id);
    var seat = req.body.seatstype;
    var fname = req.body.fname; 
    var mname = req.body.mname;
    var lname = req.body.lname; 
    var occupation = req.body.occupation; 
    var dateofbirth = req.body.DOB; 
    var sex = req.body.sex; 
    var email = req.body.email; 
    var number = req.body.mobileno; 
    var fno =req.body.fno; 
    var lane = req.body.lane; 
    var area  = req.body.area; 
    var state  = req.body.state; 
    var pincode =  req.body.pincode; 
    var city =req.body.city; 
    var count = req.body.number;
    console.log(req.body);
    if(!availid || !seat || !fname || !mname || !lname || !occupation || !dateofbirth || !sex || !email || !number || !fno || !lane ||!area || !state || !pincode ||!city ){ 
        
        req.session.loss ="please enter all the fields"; 
        console.log(req.session);
         res.render('submit', {message : req.session});
         

    } 
     else{ 
        if(req.session.bsa){ 
            var username = req.session.bsa; 
            connection.query("select id from costumer where user_name = ? ",[username],function(error,results,fields){ 
                req.body.id = results[0].id ; 
            })
            connection.query("select email_id from costumer where user_name = ? ",[username],function(error,results,fields){ 
        
            //    console.log(results[0].email_id);
                if(email!=results[0].email_id){ 
                    req.session.loss= "registered emailid doesnot match with entered emailid";
                    console.log(req.session);
                    res.render('submit', {message : req.session});
                }
                else{ 
                    console.log("hi");
                    var sql = "UPDATE costumer set FirstName = ? where user_name = ?";
                    connection.query(sql, [fname,username], function (err, result) {
                        if (err) throw err;
                       console.log("Number of records inserted: " + result.affectedRows); 
                })
                var sql = "UPDATE costumer set MiddleName = ? where user_name = ?";
                connection.query(sql, [mname,username], function (err, result) {
                    if (err) throw err;
                   console.log("Number of records inserted: " + result.affectedRows); 
            })  
            var sql = "UPDATE costumer set LastName = ? where user_name = ?";
            connection.query(sql, [lname,username], function (err, result) {
                if (err) throw err;
               console.log("Number of records inserted: " + result.affectedRows); 
        }) 
        var sql = "UPDATE costumer set Occupation = ? where user_name = ?";
        connection.query(sql, [occupation,username], function (err, result) {
            if (err) throw err;
           console.log("Number of records inserted: " + result.affectedRows); 
    }) 
    var sql = "UPDATE costumer set dateofbirth = ? where user_name = ?";
    connection.query(sql, [dateofbirth,username], function (err, result) {
        if (err) throw err;
       console.log("Number of records inserted: " + result.affectedRows); 
}) 
var sql = "UPDATE costumer set gender = ? where user_name = ?";
connection.query(sql, [sex,username], function (err, result) {
    if (err) throw err;
   console.log("Number of records inserted: " + result.affectedRows); 
}) 
var sql = "UPDATE costumer set mobilenumber = ? where user_name = ?";
connection.query(sql, [number,username], function (err, result) {
    if (err) throw err;
   console.log("Number of records inserted: " + result.affectedRows); 
}) 
var sql = "UPDATE costumer set FlatNo = ? where user_name = ?";
connection.query(sql, [fno,username], function (err, result) {
    if (err) throw err;
   console.log("Number of records inserted: " + result.affectedRows); 
}) 
var sql = "UPDATE costumer set street = ? where user_name = ?";
connection.query(sql, [lane,username], function (err, result) {
    if (err) throw err;
   console.log("Number of records inserted: " + result.affectedRows); 
})
var sql = "UPDATE costumer set area = ? where user_name = ?";
connection.query(sql, [area,username], function (err, result) {
    if (err) throw err;
   console.log("Number of records inserted: " + result.affectedRows); 
})
var sql = "UPDATE costumer set state = ? where user_name = ?";
connection.query(sql, [state,username], function (err, result) {
    if (err) throw err;
   console.log("Number of records inserted: " + result.affectedRows); 
})
var sql = "UPDATE costumer set pincode = ? where user_name = ?";
connection.query(sql, [pincode,username], function (err, result) {
    if (err) throw err;
   console.log("Number of records inserted: " + result.affectedRows); 
})
var sql = "UPDATE costumer set city = ? where user_name = ?";
connection.query(sql, [city,username], function (err, result) {
    if (err) throw err;
   console.log("Number of records inserted: " + result.affectedRows); 
})


if(seat=="seater"){
    console.log(req.session.date);
connection.query("select * from availability where availid = ?",[availid],function(error4,results4,fields4){ 
    console.log(results4)
    console.log(count);
var amjt = parseInt(results4[0].seater)-parseInt(count); 
console.log(amjt);
connection.query("UPDATE availability set seater = ? where availid = ?",[amjt,availid], function (err, result) {
    if (err) throw err;
   console.log("Number of records inserted: " + result.affectedRows); 
})
})

}
    
connection.query("select basecost from train where train_id = ? ",[train_id],function(error,results,fields){ 
        var date1 = req.session.date 
        let today1 = new Date()
        var pay1 = results[0].basecost; 
        console.log(pay1);
        if(seat=="sleepernonac"){ 
              pay1 += parseInt(pay1) + 150;
              console.log(pay1);
        }
        if(seat=="sleeperac"){ 
         pay1 +=100;
         console.log(pay1);
        }
        console.log(count);
        pay1 =  pay1*count; 
        console.log(date1);
        console.log(new Date(date1).getMonth()); 
        console.log(today1);
        console.log(new Date(today1).getMonth());
        if(new Date(date1).getMonth()-new Date(today1).getMonth()==0){ 
            pay1 += 50;
        }
        req.body.price = pay1;

        connection.query("select * from costumer where user_name = ?",[req.session.bsa],function(err,result){ 
            console.log(pay1);
            console.log(result[0].wallet)
            var ans = result[0].wallet-pay1; 
            console.log(ans);
            connection.query("UPDATE costumer set wallet = ? where user_name = ?", [ans,req.session.bsa], function (err1, result1) {   
                if (err) throw err;
                console.log("Number of records inserted: " + result1.affectedRows); 
        })
    })
    var sql = "INSERT INTO ticket (seats,travel_date,class,cost,id,availid) VALUES (?,?,?,?,?,?)";
    connection.query(sql, [count,date1,seat,pay1,req.body.id,availid], function (err, result) {
        if (err) throw err;
       console.log("Number of records inserted: " + result.affectedRows); 
}) 
                
connection.query("select ticket_id from ticket where seats = ? and travel_date = ? and class = ? and cost = ?", [count,date1,seat,pay1],function(error,results,fields){ 
    console.log(results[results.length-1]);
    req.body.tid = results[results.length-1].ticket_id ; 

console.log(req.body.tid)
let today = new Date().toLocaleDateString()


console.log(today);


console.log(train_id); 

console.log(req.body.tid);
req.body.trid = train_id;
    req.body.gois = req.session.date;
    req.body.start = req.session.user[0].startlocation;
    req.body.end = req.session.user[0].endlocation;
    const date = new Date();
    req.body.cur = date;
    console.log('hi');
      res.render('tickets',{message : req.body});
    })

         }) 
        
        }
    }) 
}
     
     else{  
         req.session.loss= "please register/login before you book ticket";
                    console.log('lol loss');
                    res.render('submit', {message : req.session}); 

     }
     
    }
    
    



 
}) 
app.get("/index4.html",function(req,res){ 
    connection.query("select id from costumer where user_name = ? ",[req.session.bsa],function(error,results,fields){ 
         if(results.length>0){ 
             var id = results[0].id; 
             console.log("hi");
             var os ={}
             connection.query("select ticket_id from ticket where id = ? ",[id],function(error1,results1,fields1){ 
                if(results1.length>0){
                    os.tickid = results1[0].ticket_id; 
                    console.log(os.tickid)
                    connection.query("select availid from ticket where ticket_id = ? ",[os.tickid],function(error2,results2,fields2){ 
                            os.train_id = results2[0].availid; 
                    
                    connection.query("select seats from ticket where ticket_id = ? ",[os.tickid],function(error2,results2,fields2){ 
                        os.seats = results2[0].seats; 
               
                connection.query("select cost from ticket where ticket_id = ? ",[os.tickid],function(error2,results2,fields2){ 
                    os.cost = results2[0].cost; 
   
            connection.query("select class from ticket where ticket_id = ? ",[os.tickid],function(error2,results2,fields2){ 
                os.class = results2[0].class; 
     
        console.log(os);
        res.render('cancel',{message : os});
    })
})
})
})
    }
    else{ 
        res.render('cancel')
    }
    }) 

       
    }
      
         else{ 
            res.render('cancel'); 
         }
})
}) 


app.get("/me/:id",function(req,res){
    const {id}= req.params;
    var us = req.session.bsa;
    console.log(us) 
    connection.query("select * from costumer where user_name = ?",[us],function(err,result){ 
        console.log(result);
       
            connection.query("select * from ticket where ticket_id= ?",[id],function(err2,result2){ 
                var ct = parseInt(result2[0].seats);
                var payt = result2[0].cost;
                var rest = result2[0].booking_date; 
                let today = new Date()
                var amnt = parseInt(payt);
                if(new Date(rest).getMonth()-new Date(today).getMonth()==0){ 
                    amnt/=2; 
                    console.log("byue")
                }
                var wal =  parseInt(result[0].wallet);
                var final = amnt+wal;
             connection.query("UPDATE costumer set wallet = ? where user_name = ?", [final,req.session.bsa], function (err4, result4) {   
                        if (err) throw err;
                        console.log("Number of records inserted: " + result4.affectedRows); 
                        
                })

                connection.query("DELETE FROM ticket  where ticket_id = ?", [id], function (err4, result4) {   
                    if (err) throw err;
                    console.log("Number of records inserted: " + result4.affectedRows); 
                    
            })

            
            })
    
    })
                

})






app.listen(3000);


