import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MetadataService {

    _prefixConf: string = "/api/configuration/get";

    constructor(private httpClient: HttpClient) {}

    getRootInfo() {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.get(this._prefixConf)
                    .subscribe(
                        data => resolve(data),
                        error => reject(error)
                    );
            }
        );
        // return this.httpClient.get(this._prefixConf);
    }
}