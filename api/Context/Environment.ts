export interface Environment extends Record<string, undefined | KVNamespace | string | DurableObjectNamespace> {
	adminSecret?: string
	hashSecret?: string
	privateSecret?: string
	userNamespace?: DurableObjectNamespace
	storage?: KVNamespace
}
