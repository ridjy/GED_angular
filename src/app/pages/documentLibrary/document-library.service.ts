import { Injectable } from '@angular/core';
import {number} from 'ng2-validation/dist/number';

export class Product {
    ID: string;
    name: string;
    expanded?: boolean;
    parentId?: string;
    icon?: string;
    price?: number;
    isFolder: boolean;
    isFile: boolean;
}

var products: Product[] = [];

@Injectable()
export class Service {

    constructor() {
    }

    getProducts(): Product[] {
        return products;
    }

    addItem(item, parentId) {
        products.push(
            {
        ID: item.nodeRef,
        name: item.name,
        expanded : (item.isFile) ? false : true,
        parentId : parentId,
        icon : (item.isFile) ? 'assets/img/pdf_file.svg' : 'assets/img/folder.svg',
        price : null,
        isFolder: item.isFolder,
        isFile: item.isFile
    }
        )
    }

    editItem(id, name) {
        products = [];
        let firstItem = {
            ID: "1",
            name: "Document library",
            expanded: false,
            isFile: false,
            isFolder: true
        };
        products.push(firstItem);
        products[0].expanded = true;
        products[0].ID=  id;
        if(name) products[0].name = name;
    }

}
