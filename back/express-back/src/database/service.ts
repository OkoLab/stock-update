import { dataSource } from './connection';
import { Sku } from './entity/Sku';

const findAll = async () => {
    let serviceDS = await dataSource;
    const skuRepository = serviceDS.getRepository(Sku);
    const sku = new Sku();
    sku.name = "SC-D5-1-K8-10--";
    await skuRepository.save(sku);
    const res = await skuRepository.find();
    return res;
}

export const result = findAll();

