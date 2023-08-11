import { OZONOPTIONS } from "src/sheets/Interfaces";

interface IOZON {
    out_path: string;
    sheet_name: string;
    rc: string;
    rc_address: string;
    stock_address: string;
    artical_address: string;
    amount_address: string;
    template_name: string;
    stock_name: string,
    getValues(): OZONOPTIONS
}

abstract class OZON implements IOZON {
    out_path = './docs/out/';
    sheet_name = 'Остатки на складе';
    rc = "Заполнены";
    rc_address = "E2";
    stock_address = "A2";
    artical_address = "B2";
    amount_address = "D2";
    template_name = "";
    stock_name = "";

    getValues(): OZONOPTIONS {
        return {
            out_path: this.out_path,
            sheet_name: this.sheet_name,
            rc: this.rc,
            rc_address: this.rc_address,
            stock_address: this.stock_address,
            artical_address: this.artical_address,
            amount_address: this.amount_address,
            template_name: this.template_name,
            stock_name: this.stock_name,
        }
    }
}

class DPI_OZON extends OZON {
    constructor() {
        super();
        this.template_name = './docs/in/dpi stock-update-template.xlsx';
        this.stock_name = 'Склад Москва (22086355777000)';
    }
}

class AON_OZON extends OZON {
    constructor() {
        super();
        this.template_name = './docs/in/aon stock-update-template.xlsx';
        this.stock_name = 'Москва аон (1020000179312000)';
    }
}

export class OZONFactory {
    static getOzon(strategy: string): IOZON {
        switch(strategy) {
            case 'dpi':
                return new DPI_OZON();
            case 'aon':
                return new AON_OZON();
            default:
                throw new Error("#194309082023: The class dosn't exist");    
        }
    }
} 

