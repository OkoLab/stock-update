export { Product, OZONOPTIONS, NEWAMOUNTS }

type Product = { name: string, amount: number }

type OZONOPTIONS = {
    out_path: string;
    sheet_name: string;
    rc: string;
    rc_address: string;
    stock_address: string;
    artical_address: string;
    amount_address: string;
    template_name: string;
    stock_name: string,
}

type NEWAMOUNTS ={
    [artical: string]: number
}