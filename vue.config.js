module.exports = {
        devServer: {
            // 设置主机地址
            host: 'localhost',
            // 设置默认端口
            port: 8080,
            // 设置代理
            proxy: {
                '/api': {
                    // 目标 API 地址
                    target: 'http://39.106.159.120:8080/admin',
                    // 如果要代理 websockets
                    ws: false,
                    // 将主机标头的原点更改为目标URL
                    changeOrigin: true
                }
            }
        },
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  
    
}