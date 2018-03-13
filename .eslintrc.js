module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jasmine": true,
        "jest": true
    },
    "extends": "standard",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "jsx-quotes": [
            "error",
            "prefer-double"
        ],
        "react/prefer-stateless-function": "error",
        "react/prop-types": "error",
        "react/jsx-indent": ["warn", 2],
        "react/jsx-key": "error",
        "react/jsx-uses-vars": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-no-bind": "error",
        "react/jsx-pascal-case": "warn",
        "react/jsx-closing-bracket-location": "warn",
        "import/first": "off"
    }
};
