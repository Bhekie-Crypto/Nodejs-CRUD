const express = require("express");
const db = require("../config/connection");

const router = express.Router();


router.use(express.urlencoded({ extended: false }));

//middleware
router.use(express.json());


//Get index page
router.get('/', (req, res) => {
    const query = "SELECT * FROM nodejs";

    const response = new Promise((resolve, reject) => {
        db.query(query, function(error, result) {
            if(error) reject(error);
            resolve(result);
            res.render("index", {
                title : "Available Users",
                users : result
            })
        });
    });
    
});

router.get("/edit/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = `SELECT * FROM nodejs WHERE id = ${userId}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.render("user_edit", {
            title: "Update User",
            user: result[0]
        });
    });
});

router.get('/add', (req, res) => {
    res.render("add_user", {
        title: "Add User"
    })
});

router.post("/save", (req, res) => {
    const data = {first_name: req.body.first_name, last_name: req.body.last_name, user_email: req.body.user_email, phone_number: req.body.phone_number}
    const sql = "INSERT INTO nodejs SET ?";
    db.query(sql, data, (err, result) => {
        if(err) throw err;
        res.redirect("/");
    });
});

router.post("/update", (req, res) => {
    const userId = req.body.id;
    const sql = "UPDATE nodejs SET first_name = '" + req.body.first_name + "', last_name = '" + req.body.last_name + "', user_email = '" + req.body.user_email + "', phone_number = '" + req.body.phone_number + "' WHERE id = '" + userId +"'";
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect("/");
    });
});

router.get("/delete/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = `DELETE FROM nodejs WHERE id = ${userId}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect("/");
    });
});


module.exports = router;