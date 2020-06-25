const fs =require("fs");
const http = require("http");
const url =require("url");


/////////////////////////////////////////////
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

//////////////////////////////////////////////////
//SERVER
const replaceTemplate = (temp,product)=>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%ID%}/g,product.id);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);

    if(product.organic == false)
    {
        output = output.replace(/{%NOT_ORGANIC%}/g,"not-organic");
    }
    return output;
}


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,"utf-8");  //overview page   //TOPLEVEL CODE ONLY RUNS ONETIME
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,"utf-8");       // product page
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,"utf-8");          //card page

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,"utf-8")       //Tis code run only once i.e.synchronous
const dataObj = JSON.parse(data)  //convert JSON to JS object

const server=http.createServer((req,res)=>{ //This is the code which run always

    const {query,pathname} =url.parse(req.url,true);  //req.url is the URL with query , pathname is without query

    //Overview page
    if(pathname =="/" || pathname == "/overview")
    {
        res.writeHead(200,{'Content-type':'text/html' })

        const cardHtml = dataObj.map((element)=>{return replaceTemplate(tempCard,element);}).join("");
        //console.log(cardHtml);

        let overview = tempOverview.replace(/{%CARD%}/g,cardHtml);
        res.end(overview);

    //Product Page
    }else if(pathname == "/product"){
        let currProduct=dataObj[query.id];

        let productHtml = replaceTemplate(tempProduct,currProduct);

        res.end(productHtml);

    //Api Page
    }
    else if(pathname == "/api")
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