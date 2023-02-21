import { Config } from "@stencil/core"

// https://stenciljs.com/docs/config
export const config: Config = {
	globalStyle: "ui/global/app.css",
	globalScript: "ui/global/app.ts",
	taskQueue: "async",
	srcDir: "ui/",
	tsconfig: "ui/tsconfig.json",
	sourceMap: true,
	outputTargets: [
		{
			type: "www",
			// comment the following line to disable service workers in production
			serviceWorker: null,
			dir: "dist/ui/",
		},
	],
	devServer: {
		openBrowser: false,
	},
	plugins: [],
}
