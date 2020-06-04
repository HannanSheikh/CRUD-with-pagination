const express = require('express');
const multer  = require('multer')
const path = require('path')
const mongoose = require('mongoose')
const users = mongoose.model('users')
module.exports=(app)=>{
    var Storage= multer.diskStorage({
        destination:"./public/uploads/",
        filename:(req,file,cb)=>{
          cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
        }
      });
      
      var upload = multer({
        storage:Storage
      }).single('file');
    app.get('/',(req,res)=>{
        res.render('home')
    })
    app.post('/',upload,(req,res)=>{
        var user = new users({
            fullname:req.body.fullname,
            email:req.body.email,
            mobile:req.body.mobile,
            city:req.body.city,
            image:req.file.filename
        })
        user.save((err,data)=>{
            if(!err){
                res.render('home')
            }else{
                console.log('insert error is '+err)
            }
        });
    })

    app.get('/records',(req,res)=>{
        var perPage = 4;
      var page = 1;
        var showAll= users.find({})
        showAll.skip((perPage * page) - perPage)
        .limit(perPage).exec(function(err,data){
            if(err) throw err
            users.countDocuments({}).exec((err,count)=>{    
            res.render('records',{record:data,current:page,pages: Math.ceil(count / perPage)})
            })
        })
        })

        app.get('/records/:page',(req,res)=>{
            var perPage = 4;
          var page = req.params.page || 1;
            var showAll= users.find({})
            showAll.skip((perPage * page) - perPage)
            .limit(perPage).exec(function(err,data){
                if(err) throw err
                users.countDocuments({}).exec((err,count)=>{    
                res.render('records',{record:data,current:page,pages: Math.ceil(count / perPage)})
                })
            })
            })

        

    app.get('/delete/:id',(req,res)=>{
        var del = users.findByIdAndDelete(req.params.id);
        del.exec(err=>{
            if(!err)
            res.redirect('/records')
            else{
                console.log('delete error is '+err)
            }
        })
    })

    app.get('/edit/:id',(req,res,next)=>{
        var edit = users.findById(req.params.id);
        edit.exec((err,data)=>{
            if(!err)
            res.render('update',{records:data})
            else{
                console.log('edit error is '+err)
            }
        })
    })

    app.post('/update/',(req,res,next)=>{
        var update = users.findByIdAndUpdate(req.body.id,{
            fullname:req.body.fullname,
            email:req.body.email,
            mobile:req.body.mobile,
            city:req.body.city
        });
        update.exec((err,data)=>{
            if(!err)
            res.redirect('/')
            else{
                console.log('update error is '+err)
            }
        })
    })

    app.post('/search/',(req,res)=>{
        var fltrname = req.body.fltrname;
        var fltremail = req.body.fltremail;
        var fltrcity = req.body.fltrcity;
        if(fltrname !='' && fltremail !='' && fltrcity !=''){
            var filterParameter = {$and:[{fullname:fltrname},
            {$and:[{email:fltremail},{city:fltrcity}]
        }]
            }
        }else if(fltrname =='' && fltremail !='' && fltrcity !=''){
            var filterParameter = {$and:[{email:fltremail},{city:fltrcity}]
            }
                }else if(fltrname =='' && fltremail =='' && fltrcity !=''){
                    var filterParameter = {$and:[{city:fltrcity}]
                    }
                        }else if(fltrname !='' && fltremail =='' && fltrcity !=''){
                            var filterParameter = {$and:[{fullname:fltrname},{city:fltrcity}]
                            }
                                }else if(fltrname !='' && fltremail !='' && fltrcity ==''){
                                    var filterParameter = {$and:[{fullname:fltrname},{email:fltremail}]
                                    }
                                        }else if(fltrname !='' && fltremail =='' && fltrcity ==''){
                                            var filterParameter = {$and:[{fullname:fltrname}]
                                            }
                                              }else if(fltrname =='' && fltremail !='' && fltrcity ==''){
                                                var filterParameter = {$and:[{email:fltremail}]
                                                }
                                                  }else{
                                                      var filterParameter={}
                                                      }
                    var empFilter = users.find(filterParameter)
                    empFilter.exec((err,docs)=>{
                        if(!err){
                            res.render('records',{
                                record:docs
                            })
                        }else{
                            alert('ERROR '+err)
                        }
                    })
        })
}