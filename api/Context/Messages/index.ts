import * as gracely from "gracely"
import * as storage from "cloudly-storage"
import { model } from "../../../model"

export class Message {
	private constructor(private readonly message: storage.KeyValueStore<model.Message>) {}
	create(message: model.Message.Creatable, referer: string) {
		const result = model.Message.create(message, referer)
		this.message.set(result.id, result)
		return result
	}
	static create(namespace: KVNamespace | undefined): Message | gracely.Error {
		return namespace
			? new Message(storage.KeyValueStore.Json.create<model.Message>(namespace))
			: gracely.server.misconfigured("storage", "storage missing from environment")
	}
}
