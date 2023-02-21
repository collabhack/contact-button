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
	else
		result = gracely.success.created(model.Message.create(message, "localhost"))
	return result
}
router.add("POST", "/api/message", create)
