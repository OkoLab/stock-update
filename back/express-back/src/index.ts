import express from "express"
import cors from "cors"
import Lexer from "./commander/Lexer"
import "reflect-metadata"
import { AppDataSource } from './database/data-source'
import { Sku } from './database/entity/Sku'
import { result } from './database/service'

const code = "(D2 == 3)=5";
const lexer = new Lexer(code);
lexer.lexAnalisys();

async function getAllSku(){
    const res1 = await result;
    console.log(res1);
}

getAllSku();

//console.log(lexer.tokenList);

// AppDataSource.initialize()
//     .then(async () => {
//         console.log("Data Source has been initialized!");
//         // const sku = new Sku();
//         // sku.name = "SC-D5-1-K8-10--";
//         // await AppDataSource.manager.save(sku);
//         // console.log("Photo has been saved. Photo id is", sku.name)
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization:", err)
//     })

//const PORT = process.env.PORT ?? 5173;
const PORT = 3000;
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));

// async function test1() {
//     const sku = new Sku();
//     sku.name = "SC-D5-1-K8-10--";
//     await AppDataSource.manager.save(sku);
//     console.log("Photo has been saved. Photo id is", sku.name)
//     //const savedPhotos = await AppDataSource.manager.find(Sku);
//     //console.log("All photos from the db: ", savedPhotos);
// };

// test1();

// app.get('/api/test', (req, res) => {
//     res.send("Hello node");
// });


// app.get('/api/:command', function (req:any, res:any) {
//     res.json({msg: req.params.command })
//   })

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

app.listen(PORT, () => {
    console.log("The server is started...");
});