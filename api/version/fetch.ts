import * as http from "cloudly-http"
import * as data from "../../package.json"
import { Context } from "../Context"
import { router } from "../router"

export async function fetch(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	const result: any = {
		name: data.name,
		version: data.version,
	}
	if ((await context.authenticate(request)) == "admin") {
		result.environment = context.environment
		result.dependencies = data.dependencies
	}

	return result
}
router.add("GET", "/api/version", fetch)
