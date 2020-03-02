import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Product, Service} from '../documentLibrary/document-library.service';
import {ServerService} from '../../alfresco_services/AlfrescoApi.service';
import {ItemModel} from '../documentLibrary/item.model';
import {MetadataService} from '../../metadata_services/metadata.service';

@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FilemanagerComponent implements OnInit {

    products: Product[];
    currentItem: Product;
    breadCrump: BreadCrump[] = [];
    currentNodeRef: string;
    rootName: string = 'Root';
    prevFolder: boolean = false;
    basicInfo: boolean = false;
    metadataFile: boolean = false;
    fileView: boolean = false;
    fileInformation: any;
    // fileInformation: {
    //   contentSize: number;
    //   createdAt: Date;
    //   createdByUser: string;
    //   nodeRef: string;
    //   name: string;
    //   parentNode: string;
    //   properties: {
    //       description: string;
    //       versionLabel: string;
    //       versionType: string;
    //   }
    // };
    iconsFile = {
        'folder': 'assets/img/folder.svg',
        'pdf': 'assets/img/pdf_file.svg'
    };

    constructor(private serverService: ServerService,
                private service: Service,
                private metadataService: MetadataService
    ) {}

    ngOnInit() {
        // initiation of the root folder
        this.getFolderContent(null);
        this.basicInfo = true;
    }

    selectItem(e) {
        // item selected
        if (e.itemData.ID !== this.currentNodeRef) {
            // pointed to the new root item
            this.currentItem = e.itemData;
            if(!this.prevFolder) {
                // save the previous bread crump
                this.breadCrump.push(new BreadCrump(this.currentNodeRef, this.rootName));
            }
            if (e.itemData.isFolder) {
                this.getFolderContent(e.itemData.ID);
            } else {
                this.basicInfo = true;
                this.prevFolder = true;
                this.getFileContent(e.itemData.ID);
            }
            if (this.currentItem.name) {
                this.rootName = e.itemData.name;
            }

        }
    }

    getFileContent(node) {
        this.serverService.getNodeInfo(node)
            .then(
                (data: any) => {
                    this.fileInformation = data;
                    console.log(this.fileInformation.properties);
                    console.log(this.fileInformation.properties);
                },
                error => {
                    console.log(error);
                }
            );
    }

    getFolderContent(node) {
        this.metadataService.getRootInfo()
            .then(
                (data:any) => {
                    this.currentNodeRef = node || data.rootNode;
                    this.service.editItem(this.currentNodeRef, this.rootName);
                    this.serverService.getNodeChilds(this.currentNodeRef)
                        .then(
                            (data: any) => {
                                const tab = data.list.entries;
                                for (const child of tab)
                                {
                                    const nodeInfo = new ItemModel(child.entry.createdAt, child.entry.id, child.entry.isFile, child.entry.isFolder, child.entry.name, child.entry.parentId);
                                    this.service.addItem(nodeInfo, this.currentNodeRef);
                                }
                            }
                        );
                    this.products = this.service.getProducts();
                    this.currentItem = this.products[0];
                }
            )
            .catch( error => console.log(error));
    }

    // in case we want come back to previous folder from the bread crump
    previousFolder(node) {
        this.basicInfo = false;
        this.metadataFile = false;
        this.fileView = false;
        this.prevFolder = false;
        let newBreadCrump: BreadCrump[] = [];
        for(let bread of this.breadCrump) {
            if(bread.node !== node) {
                newBreadCrump.push(bread);
            }
            else {
                this.breadCrump = newBreadCrump;
                this.rootName = bread.name;
                this.currentNodeRef = bread.node;
                this.getFolderContent(bread.node);
                // this.lastBreadCrump = bread.name;
                break;
            }
        }
    }

    // toggle between basic info, metadata, preview file
    toggleNav(nav) {
        if(nav === 'basic-info') {
            this.metadataFile = false;
            this.fileView = false;
            this.basicInfo = true;
        }
        else if(nav === 'metadata') {
            this.fileView = false;
            this.basicInfo = false;
            this.metadataFile = true;
        }
        else {
            this.basicInfo = false;
            this.metadataFile = false;
            this.fileView = true;
        }
    }

}

// BreadCrump model
export class BreadCrump {
    constructor(node, name) {
        this.node = node;
        this.name = name;
    }
    node: string;
    name: string;
}
