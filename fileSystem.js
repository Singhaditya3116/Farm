const fs =require("fs");

// fs.readFile("./txt/start.txt","utf-8",(err,data)=>{
//     console.log(data);
// })

fs.readFile("./txt/start.txt","utf-8",(err,data)=>{
    fs.readFile(`./txt/${data}.txt`,"utf-8",(err,data2)=>{
        console.log(data2);
        fs.readFile("./txt/append.txt","utf-8",(err,data3)=>{
            console.log(data3);

            fs.writeFile("./txt/final.txt",`${data2}.txt\n${data3}.txt`,"utf-8",err =>{
                console.log("done");
            })
        })
    })
})