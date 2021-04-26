const express = require('express')
const { dirname } = require('node:path')
const app = express()
const { resolve } = require('path')
const PORT = process.env.PORT || 3000

app.use('/', 
    express.static( 
        resolve(
            --dirname,
            './build'
        )
    )
)

app.listen(PORT, (err) => { 
    if(err)
        console.log(err)
    else
        console.log(`Listening on port ${PORT}`)
})