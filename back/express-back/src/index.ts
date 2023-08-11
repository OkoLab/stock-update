import express from "express"
import cors from "cors"
import Lexer from "./commander/Lexer"
import { DataBase } from "./database/DataBase";
import { Controller } from "./controller/Controller";
import Parser from "./commander/Parser";
import { Kits } from "./controller/Types";
import { OzonFileGenerator } from "./sheets/generator/OzonFileGenerator";
import { OZONFactory } from "./sheets/templates/ozon/OZON";
// import { result } from './database/service'

// const code = "(D2==3)=5;";
//const code = "((D5==1)&&(K8==20))=5;";
const code = "((D5==1)&&(K8>=10))=5;";
//const code = "D5=5;";
const lexer = new Lexer(code);
//console.log(lexer.lexAnalisys());
lexer.lexAnalisys();
const db = new DataBase();
await db.openConnectionToDB();
const contr = new Controller(db);
const kits: Kits = await contr.getArrayOfKits();
const parser = new Parser(lexer.tokenList, contr, kits);
const rootNode = parser.parseCode();
// console.log("rootNode:");
// console.log(rootNode);
parser.run(rootNode);
const kitAmounts = parser.getKitAmounts();
db.closeConnectionToDB();

const aon_ozon = new OzonFileGenerator("aon", "aon", kitAmounts );
aon_ozon.start();

// console.log("FormulaNode++++++++++++: ");
// console.log(JSON.stringify(rootNode, null, 4));
// console.log("+++++++++++++++++++++++++++: ");



// const db = new DataBase();
// await db.connectionToDB();
// const contr = new Controller(db);
// const kits: Kits = await contr.getArrayOfKits();
// console.log(kits);

// const db = new DataBase();
// await db.connectionToDB();
// console.log(res);

// const res1 = await result;
// console.log(res1);

// async function getAllSku(){
//     const res1 = await result;
// }

// getAllSku();

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
// const PORT = 3000;
// const app = express();


// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

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

// app.listen(PORT, () => {
//     console.log("The server is started...");
// });