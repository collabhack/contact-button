import * as gracely from "gracely"
import * as http from "cloudly-http"
import { model } from "../../model"
import { Context } from "../Context"
import { router } from "../router"

export async function create(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	let result: gracely.Result
	const message = await request.body
	if (!model.Message.Creatable.is(message))
		result = gracely.client.invalidContent("Message", "A valid Message.")
	else if (gracely.Error.is(context.message))
		result = context.message
	else if (!request.header.referer)
		result = gracely.client.missingHeader("referer", "referer required")
	else
		result = gracely.success.created(context.message.create(message, request.header.referer))
	return result
}
router.add("POST", "/api/message", create)
