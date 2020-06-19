const queue = require('../config/kue')

const commentsMailer = require('../mailers/comments_mailer')
const { Job } = require('kue')

//every worker has a process function
//queue process function tells the worker whenever a new task is added to the queue you need to run the code inside the process method
//process takes 2 arguments, 1st is the type of queue or the queue name



queue.process('emails',function(job, done){
    console.log('Worker for emails is busy processing a job', job.data);
    

    //call the functionality or whatever the stuff you want this worker to do
    //rather than calling this job from comments controller we will call our worker from comments controller
    commentsMailer.newComment(job.data);


    done();
})