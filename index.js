const express = require('express');
const upload = require('express-fileupload');
const fs = require('fs');

const app = express();
app.set('view-engine', 'ejs');

app.use(upload());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');

    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Origin-Mentods','PUT POST DELETE GET PATCH');
        return res.status(200);
    }
    next();
});
app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.ejs');
})

app.post('/', (req,res) => {
    if(req.files) {
        console.log(req.files);
        var file = req.files.file;
        var filename = file.name;
        console.log(filename);
        file.mv('./uploads/'+filename, (err) => {
            if(err){
                res.status(500).send(err);
            }else{
                res.render(__dirname + '/views/uploadsuccessful.ejs');
            }
        })
    }else{
        console.log("No file");
    }
})






app.get('/filelist', (req,res) => {
    fs.readdir('./uploads/', (err, filelist) => {
        console.log(filelist);
        res.render(__dirname + '/views/filelist.ejs', {filelist: filelist});
    });
})


app.listen(5000);