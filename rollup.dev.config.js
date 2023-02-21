// plugin-node-resolve and plugin-commonjs are required for a rollup bundled project
// to resolve dependencies from node_modules. See the documentation for these plugins
// for more details.
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import json from "@rollup/plugin-json"
import path from "path"

export default [{
		input: "api/index.ts",
		output: {
			exports: "named",
			format: "es",
			file: "dist/api/_worker.mjs",
			sourcemap: true,
			sourcemapPathTransform: (relativeSourcePath, _) => path.resolve(__dirname, path.resolve(__dirname, relativeSourcePath.replace(/^(\.\.\/)+/, "")),)
		},
		plugins: [commonjs(), nodeResolve({ browser: true }), typescript({ tsconfig: "./api/tsconfig.json" }), json()],
		watch: {
			clearScreen: false,
		},
		onwarn: warning => {
			if ( warning.code !== 'THIS_IS_UNDEFINED' )
				console.warn( warning.message );
		},
	},
]
