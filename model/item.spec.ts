import * as model from "../model"

describe("item", () => {
	it("is", () => {
		const item: model.Item = {
			id: "abc",
			number: 1,
		}
		expect(model.Item.is(item)).toBe(true)
	})
})
