const fs =require("fs");
const http = require("http");
const url =require("url");


/////////////////////////////
//FILE

// // fs.readFile("./txt/start.txt","utf-8",(err,data)=>{
// //     console.log(data);
// // })

// fs.readFile("./txt/start.txt","utf-8",(err,data)=>{
//     fs.readFile(`./txt/${data}.txt`,"utf-8",(err,data2)=>{
//         console.log(data2);
//         fs.readFile("./txt/append.txt","utf-8",(err,data3)=>{
//             console.log(data3);

//             fs.writeFile("./txt/final.txt",`${data2}.txt\n${data3}.txt`,"utf-8",err =>{
//                 console.log("done");
//             })
//         })
//     })
// })

//////////////////////////////
//SERVER

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8")       //Tis code run only once i.e.synchronous
const dataObj = JSON.parse(data)  //convert JSON to JS object

const server=http.createServer((req,res)=>{ //This is the code which run always

    const pathName = req.url;
    if(pathName =="/" || pathName == "/overview")
    {
        res.end("THis is from overview");
    }else if(pathName == "/product"){
        res.end("This is from product");
    }
    else if(pathName == "/api")
    {
        res.writeHead(200,{
            'Content-type':'application/json'
        });

        res.end(data);
    }else
    {
        res.writeHead(404,{                                      //Always send header before
            'Content-type':'text/html',
            'my-own-header':'helllo world'
        });
        res.end("<h1>Not such page available</h1>");
    }
    //res.end("hello from server side");
})



server.listen(3000,"127.0.0.1",()=>{
    console.log("Server started");
})