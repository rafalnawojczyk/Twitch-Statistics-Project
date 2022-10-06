// next.config.js
const withImages = require("next-images");
module.exports = withImages();

module.exports = (phase, { defaultConfig }) => {
    if ("sassOptions" in defaultConfig) {
        defaultConfig["sassOptions"] = {
            includePaths: ["./src"],
            prependData: `@import "~@styles/variables.scss";`,
        };
    }
    return defaultConfig;
};
