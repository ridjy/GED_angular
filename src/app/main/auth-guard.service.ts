import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {ServerService} from "../alfresco_services/AlfrescoApi.service";

@Injectable()
export class AuthGuardService implements CanActivate{

    constructor(private alfrescoApi: ServerService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.alfrescoApi.isLoggedIn()) {
            return true;
        }
        else this.router.navigate(['/']);
    }

}