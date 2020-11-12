import { terser } from 'rollup-plugin-terser'

export default {
    input: 'ligi.js',
    output: {
        file: 'dist/ligi.umd.min.js',
        format: 'umd',
        name: '$_'
    },
    plugins: [terser()]
}