import * as gracely from "gracely"
import { FormData } from "cloudly-formdata"
import * as http from "cloudly-http"
import { router } from "../router"
import { Environment } from "./Environment"
import { Message } from "./Messages"

export class Context {
	#messages?: Message | gracely.Error
	get message(): Message | gracely.Error {
		return (this.#messages ??= Message.create(this.environment.storage))
	}
	constructor(private readonly environment: Environment) {}
	async authenticate(request: http.Request): Promise<"admin" | undefined> {
		return this.environment.adminSecret && request.header.authorization == `Basic ${this.environment.adminSecret}`
			? "admin"
			: undefined
	}
	static async handle(request: Request, environment: Environment): Promise<Response> {
		let result: http.Response
		try {
			result = await router.handle(http.Request.from(request), new Context(environment))
		} catch (e) {
			const details = (typeof e == "object" && e && e.toString()) || undefined
			result = http.Response.create(gracely.server.unknown(details, "exception"))
		}
		return http.Response.to(result)
	}
}

http.Parser.add(
	async request =>
		Object.fromEntries(
			(
				await FormData.parse(
					new Uint8Array(await request.arrayBuffer()),
					request.headers.get("Content-Type") ?? "multipart/form-data"
				)
			).entries()
		),
	"multipart/form-data"
)
