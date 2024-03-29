const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const collection = require("./config");
const { name } = require("ejs");

const app = express();

app.use(express.json ());
app.use(express.urlencoded({ extended: false }));

// ues EJS as the view engine
app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('Login');
});
app.get("/Login", (req, res) => {
    res.render('Login');
});

app.get("/Signup", (req, res) => {
    res.render("Signup");
});

app.post("/Signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
}

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("This user already exists");
    } else {
        const setRound = 10;
        const hashedPassword = await bcrypt.hash(data.password, setRound);
        data.password = hashedPassword;
        res.send("User created successfully");

        const userData = await collection.insertMany(data);
        console.log("Data inserted successfully");
        console.log(userData);
    }
});


app.post("/Login", async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("Invalid User")
        }

        const match = await bcrypt.compare(req.body.password, check.password);
        if(match){
            res.render("Home")
        }else{
            res.send("Invalid Password")
        }

    }catch{
        res.send("Invalid User")
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})