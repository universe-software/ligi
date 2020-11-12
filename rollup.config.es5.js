import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
    input: 'ligi.js',
    output: {
        file: 'dist/ligi.umd.es5.min.js',
        format: 'umd',
        name: '$_'
    },
    plugins: [
        babel(),
        terser()
    ]
}