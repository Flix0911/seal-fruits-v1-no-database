//import express
const express = require("express")

//create a router
const router = express.Router()

//import the fruits array (data)
const fruits = require("../models/fruits.js")

//ROUTES GO BELOW HERE

// fruits index route
// get request to /fruits
// return all fruits
//"/fruits" is implied so we're removing that part
router.get("/", (req, res) => {
    // res.send(fruits)
    // "fruits/index.ejs" => "./views/fruits/index.ejs"
    // {fruits} => {fruits:fruits}
    res.render("fruits/index.ejs", {fruits})
})

//induces is your best friend

//newroute - render a page with a form
//get request to /fruits/new
//allow us to have a form to create a new fruit
//"/fruits" is implied so we're removing that part
router.get("/new", (req, res) => {
    // render a template with our form
    // fruits/new.ejs = ./views/ + fruits/new.js
    res.render("fruits/new.ejs")
})

//our create route - receives form data, creates new fruit
//post request /fruits
//create a fruit from the form data, then redirect back to index page
//"/fruits" is implied so we're removing that part
router.post("/", (req, res) => {
    //get the form data from the request
    const body = req.body
    //send back the form data as JSON
    //res.send(body)
    //convert the readyToEat to true/false
    if (body.readyToEat === "on"){
        body.readyToEat = true
    } else {
        body.readyToEat = false
    }

    //add the fruit to the array
    fruits.push(body)

    //redirect them back to the index page
    res.redirect("/fruits")
})

//EDIT route - render a form to edit a specific fruit
//GET to /fruits/:id/edit
//render a form with the existing values filled in
//"/fruits" is implied so we're removing that part
router.get("/:id/edit", (req, res) => {
    //get the id from params
    const id = req.params.id
    //get the fruit being updated
    const fruit = fruits[id]
     // send the id and fruit over to the template
    // fruits/edit.ejs -> ./views/fruits/edit.ejs
    res.render("fruits/edit.ejs", {fruit, id})
})

//UPDATE route - receive the form data, updates the fruit
//PUT to /fruits/:id
//update the specified fruit, then redirect to index
//"/fruits" is implied so we're removing that part
router.put("/:id", (req, res) => {
    //get the id
    const id = req.params.id
    //get the body
    const body = req.body
    //convert readyToEat to true or false
    if(body.readyToEat === "on"){
        body.readyToEat = true
    } else {
        body.readyToEat = false
    }
    //swap the old version of fruit with the new version
    fruits[id] = body
    //redirect back to index page
    res.redirect("/fruits")
})

//destory route - deletes a fruit
//delete -> /fruits/:id
//deletes the specified fruit, redirects to index
//"/fruits" is implied so we're removing that part
router.delete("/:id", (req, res) => {
    //get the id from params
    const id = req.params.id
    //then we'll splice it from the array (remove from an array)
    //arr.splice(index, numOfItemToCut)
    fruits.splice(id, 1)
    //redirect back to index
    res.redirect("/fruits")
})



// fruits show route
// get request to /fruits/:id
// return a single fruit
//"/fruits" is implied so we're removing that part
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the fruit from the array
    const fruit = fruits[id]
    // send the fruit as the response
    // res.send(fruit)

    // render the show.ejs template
    // res.render(template, data)
    // for the template assume "/views/"
    // "fruits/show.ejs" =>  ./views/fruits/show.ejs
    res.render("fruits/show.ejs", {fruit, id})
    // {fruit} is the same as {fruit:fruit}
})

//EXPORT THE ROUTER
module.exports = router