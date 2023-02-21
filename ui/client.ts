import { model } from "../model"

export const client = model.Client.create(
	["localhost", "127.0.0.1"].includes(window.location.hostname) ? "http://localhost:8787/api" : "prodUrlHere"
)
