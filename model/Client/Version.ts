import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"

export class Version extends rest.Collection<gracely.Error> {
	constructor(client: http.Client) {
		super(client)
	}
	async fetch() {
		return this.client.get<any>("/version")
	}
}
