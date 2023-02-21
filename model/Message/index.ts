import * as isoly from "isoly"
import { Creatable as MessageCreatable } from "./Creatable"

export interface Message extends Message.Creatable {
	id: string
	created: isoly.DateTime
	referer: string
}
export namespace Message {
	export function is(value: Message | unknown): value is Message {
		return typeof value == "object" && !!value && Creatable.is(value)
	}
	export function create(message: Creatable, referer: string): Message {
		return { ...message, id: "", created: isoly.DateTime.now(), referer }
	}
	export type Creatable = MessageCreatable
	export const Creatable = MessageCreatable
}
