module.exports = {
    "key-station": {
        output: {
            mode: "split",
            target: "src/store/api/key-station-api.ts",
            schemas: "src/model",
            override: {
                mutator: {
                    path: "src/store/api/axios.ts",
                    name: "customInstance",
                },
            },
        },
        input: {
            target: "./openapi.json",
        },
    },
};
