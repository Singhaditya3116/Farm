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

const server=http.createServer((req,res)=>{

    const pathName = req.url;
    if(pathName =="/" || pathName == "/overview")
    {
        res.end("THis is from overview");
    }else if(pathName == "/product"){
        res.end("This is from product");
    }
    else
    {
        res.writeHead(404,{                                      //Always send header before
            'Content-type':'text/html'
            'my-own-header':'hello world'
        });
        res.end("<h1>Not such page available</h1>");
    }
    //res.end("hello from server side");
})



server.listen(3000,"127.0.0.1",()=>{
    console.log("Server started");
})