import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ServerService} from "../../alfresco_services/AlfrescoApi.service";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestingComponent implements OnInit {

    @Input() nodeRefInfo;
    @Input() nodeRefChilds;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

    isLoggedIn() {
        let boolean = this.serverService.isLoggedIn();
        console.log(boolean);
    }

    getTocken() {
        let ticket = this.serverService.getTocken();
        console.log(ticket);
    }

    onLogin() {
        this.serverService.loginWithUsernameAndPassword('admin', '1100')
            .then(
                data => console.log(data)
            )
            .catch(
                error => console.log(error)
            );
    }

    getNodeInfo(nodeRef) {
          this.serverService.getNodeInfo(nodeRef)
              .then(
                  (data: any) => {
                      console.log(data);
                  }
              )
    }
    getNodeChilds(nodeRef) {
            this.serverService.getNodeChilds(nodeRef)
                .then(
                    data => console.log(data)
                )
        }
}
