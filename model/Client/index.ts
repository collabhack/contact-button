import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Version } from "./Version"

export class Client extends rest.Client<gracely.Error> {
	readonly version = new Version(this.client)
	static create<T = Record<string, any>>(server: string, _?: string, load?: (client: http.Client) => T): Client & T {
		let httpClient: http.Client<gracely.Error>
		const result = new Client((httpClient = new http.Client<gracely.Error>(server, undefined, {})))
		if (load)
			Object.assign(result, load(httpClient))
		return result as Client & T
	}
}
