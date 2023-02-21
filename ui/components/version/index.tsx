import { Component, h, Host, State } from "@stencil/core"
import { client } from "../../client"

@Component({
	tag: "template-version",
	styleUrl: "style.css",
	scoped: true,
})
export class ApiVersion {
	@State() version?: string

	async connectedCallback() {
		const response = await client.version.fetch()
		this.version = response.version
	}
	render() {
		return <Host>{this.version ? `api version: ${this.version}` : "loading..."}</Host>
	}
}
