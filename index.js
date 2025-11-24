// Import dotenv
require("dotenv").config() //Loads .env file contents into process.env by default

// 1.Import express
const express = require("express")

// 5. import cors
const cors = require("cors")

// 8. import routes
const router = require("./router")

// 11. Import connection file
require("./db/connection")

// 2.Create server
const bookStoreServer = express()

//6. tell server to use cors
bookStoreServer.use(cors())

// 10. Parse Request / Middleware
bookStoreServer.use(express.json())

//9. tell server to use router
bookStoreServer.use(router)

// 3.Create port
const PORT = 3000

// 4.tell server to listen
bookStoreServer.listen(PORT,()=>{
    console.log(`BookStore Server Started Running successfully at Port Number : ${PORT}, waiting for Client Request `);
})

bookStoreServer.get("/",(req, res)=>{
    res.status(200).send(`BookStore Server Started Running successfully and waiting for Client Request `)
}) 

// bookStoreServer.post("/",(req, res)=>{
//     res.status(200).send(`POST REQUEST `)
// })