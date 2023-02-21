export interface Creatable {
	name: string
	email: string
	phone: string
	comment: string
	reference: string
}
export namespace Creatable {
	export function is(value: Creatable | unknown): value is Creatable {
		return typeof value == "object" && !!value
	}
}
