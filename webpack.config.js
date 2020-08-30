const path = require('path');

module.exports = {
    entry: "./src/index.tsx",
    output:{
        path: path.resolve(__dirname, './public'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/public/',
        filename: "library.js",
        library: "library"
    },
    module:{
        rules:[   //загрузчик для jsx
            {
                test: /\.tsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                use: "ts-loader",   // определяем загрузчик
            },
            {
                test: /\.css?$/,
                use: "css-loader"
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ],

            },
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    }

}