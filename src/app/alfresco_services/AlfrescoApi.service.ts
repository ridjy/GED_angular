import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as AlfrescoApi from "alfresco-js-api";
import {MetadataService} from "../metadata_services/metadata.service";
import {Service} from "../pages/documentLibrary/document-library.service";
const     alfrescoJsApi  = new AlfrescoApi(    {
    ticketEcm: '',
    hostEcm: 'http://localhost:4200'
});

@Injectable()
export class ServerService implements OnInit{

  constructor(
      private metadataService: MetadataService,
      private service: Service,
      private httpClient: HttpClient) {
  }

  ngOnInit() {

  }

  isLoggedIn() {
      return alfrescoJsApi.isLoggedIn();
  }
  getContentUrl(nodeRef) {
      return new Promise(
          (resolve, reject) => {
             resolve(alfrescoJsApi.content.getContentUrl(nodeRef));
          }
      );
  }

  getTocken() {
      return alfrescoJsApi.getTicketEcm();
  }

  setTocken(ticket) {
      alfrescoJsApi.setTicket(ticket, '');
  }

  loginWithUsernameAndPassword(username, password): Promise<any> {
      return new Promise (
          (resolve, reject) => {
              //------------> in case we want use alfresco-js-api
              alfrescoJsApi.login(username, password).then(data => {
                  // this.getFolders();
                  resolve(data);
              }, error => {
                  reject(error);
              });
              //------------> in case we want use rest api alfresco
              // this.httpClient.get('http://localhost:8080/alfresco/s/api/login?u=admin&pw=1100', { responseType: 'text' })
              //     .subscribe(
              //         (response) => {
              //             // this.ticket = response.toString();
              //             // console.log(response);
              //             // console.log(this.ticket);
              //             console.log(response);
              //         }
              //     )
          }
      );
  }

  // getFolders() {
  //     this.metadataService.getRootInfo()
  //         .then(
  //             (data1:any) => {
  //                 console.log(data1);
  //                 this.service.editItem(data1.nodeRef);
  //                 this.getNodeChilds(data1.nodeRef)
  //                     .then(
  //                         (data2: any) => {
  //                             let tab = data2.list.entries;
  //                             for (let child of tab) {
  //                                 let nodeInfo = new ItemModel(child.entry.createdAt, child.entry.id, child.entry.isFile, child.entry.isFolder, child.entry.name, child.entry.parentId);
  //                                 this.service.addItem(nodeInfo, data1.nodeRef);
  //                                 if( child.entry.isFolder) {
  //                                     // this.boucleFolders(child.entry.id);
  //                                 }
  //                                 else return;
  //                             }
  //                         }
  //                     );
  //                 // this.service.editItem(rootId);
  //             }
  //         )
  //         .catch( error => console.log(error));
  // }

  loginWithToken(ticket) {
      return new Promise (
          (resolve, reject) => {
              alfrescoJsApi.loginTicket(ticket)
                  .then(
                      data => {
                          // this.getFolders();
                          resolve(data);
                      },
                      error => {
                          reject(error);
                      });
          });
  }

  getNodeInfo(nodeId) {
      return new Promise(
          (resolve, reject) => {
              alfrescoJsApi.nodes.getNodeInfo(nodeId)
                  .then(
                      data => {
                          resolve(data);
                      },
                      error => {
                          reject(error);
                      });
          }
      );
  }

  getNodeChilds (nodeId): Promise<any> {
      return new Promise(
          (resolve, reject) => {
              alfrescoJsApi.nodes.getNodeChildren(nodeId)
                  .then(
                      data => {
                          resolve(data);
                      },
                      error => {
                          reject(error);
                      });
          }
      );
  }

}