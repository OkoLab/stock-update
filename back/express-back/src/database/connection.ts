import { AppDataSource } from './data-source'

const connToDS = async() => {
    try{
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        return AppDataSource;
    }catch(err){
        throw new Error(`Error during Data Source initialization`)      
    }
}

export const dataSource = connToDS();


// export default await AppDataSource
//     .initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization:", err)
//     })