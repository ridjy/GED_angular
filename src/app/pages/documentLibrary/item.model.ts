import data from "devextreme/bundles/dx.all";

export class ItemModel {
    constructor(createAt, nodeRef, isFile, isFolder, name, parentId) {
        this.createAt = createAt;
        this.nodeRef = nodeRef;
        this.isFile = isFile;
        this.isFolder = isFolder;
        this.name = name;
        this.parentId = parentId;
    }
    createAt: Date;
    nodeRef: string;
    isFile: boolean;
    isFolder: boolean;
    name: string;
    parentId: string;

}