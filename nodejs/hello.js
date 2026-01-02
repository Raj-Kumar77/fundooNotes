// const {add, sub}= require('./math')

// console.log(add(2,6))
// console.log(sub(2,6))


const fs = require('fs')

// fs.writeFileSync('./server.js', 'console.log("file created")')
// fs.writeFile('./file1.txt', 'asynchonous mehtod', (err)=>{} )

//   const res =  fs.readFileSync('./file1.txt', 'utf-8')
//   console.log(res)


//it does not return anything
// fs.readFile('./server.js', 'utf-8', (err, res)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(res)
//     }
// })


// fs.appendFileSync('./server.js', `\nconsole.log("append file")`)

// fs.cpSync('./server.js', './copy.js')

// fs.unlinkSync('./copy.js')

// console.log(fs.statSync('./server.js'))

// fs.mkdirSync('my-docs')

// fs.mkdirSync('mydocs/a', {recursive: true})


// synchronous execution
// console.log(1) 
// const res = fs.readFileSync('./server.js', 'utf-8')
// console.log(res)
// console.log(2)


// asynchronous execution
// console.log(1) 
// fs.readFile('./server.js', 'utf-8', (err, res)=>{
//     console.log(res)
// })
// console.log(2)


// ------------------ http server ----------------
const http = require('http')

const myServer = http.createServer((req,res)=>{
    // console.log('new req received')
    // console.log(req.headers)
    // res.end('hello from server')

    const log = `\n${Date.now()} ${req.url} New Req received`
    fs.appendFile('./log.txt', log, ()=>{
        switch(req.url){
            case '/':
                // console.log(req.method)
                res.end('homepage')
                break;
            case '/about':
                res.end('about page')
                break;
            default:
                res.end('404 page')
                break
            
        }
    })
})

myServer.listen(8000, ()=>console.log('server started'))
