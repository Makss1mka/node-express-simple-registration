const express = require("express")

const app = express()
const USERS = ["Arnold", "Random", "Djamshut", "Aboba", "Jeka"]

app.use(function(request, response, next) {

    console.log(request.url, request.method, request.params, request.query)
    next()

})

app.post("/registration", express.json(), function(request, response) {
    if (!request.body) response.sendStatus(400);
    
    const username = request.body.name;
    const password = request.body.password;
    let result = {"username": true, "password": true};

    if (USERS.find((value) => value === username)) result["username"] = false;
    if (function(password) {
        let numCriteria = false, specCriteria = false, upperCriteria = false, lowerCriteria = false;

        if (password.length < 8 || password.length > 20) return true 

        for (let i = 0; i < password.length; i++) {
            let charCode = password.charCodeAt(i); 
            
            if (charCode >= 33 && charCode <= 47) {
                specCriteria = true;
            } else if (charCode >= 48 && charCode <= 57) {
                numCriteria = true;
            } else if (charCode >= 65 && charCode <= 90) {
                upperCriteria = true;
            } else if (charCode >= 97 && charCode <= 122) {
                lowerCriteria = true;
            }
        }

        if (specCriteria !== true || upperCriteria !== true || numCriteria !== true || lowerCriteria !== true) return true
        return false
    } (password)) result["password"] = false;

    console.log(username, password, result)
    response.send(result)
})

app.listen(8000, () => console.log("Server is listening to 8000 port"))