const path = require("path")
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("base", resolve("baseConfig"))
            .set("public", resolve("public"));
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    css:{ // 这一步配置将css强行内联，否则发布后的组件在使用时不会携带css
        extract:false
    }
}