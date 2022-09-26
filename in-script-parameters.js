const infiniteProxy = () => {
    return new Proxy(function() {}, {
        get: (_, p) => {
            if (p === "toJSON") {
                return () => { throw new Error("'required' resource might be used during script parsing") };
            } else {
                return infiniteProxy()
            }
        },
        apply: () => infiniteProxy(),
    });
};

function withPatchedEnv(fn){
    module = {};
    module.exports = exports = {};
    require = infiniteProxy();
    
    //deactivate some node features to avoid issues during script evaluation
    var requireTmp = require;
    var consoleTmp = console;
    require = infiniteProxy();
    console = infiniteProxy();
    fn();
    require = requireTmp;
    console = consoleTmp;
}

function scriptParameters(source){
    let parameters;
    withPatchedEnv(() => {
        console.log("evaluating: " + source);
        eval(source);
        parameters = module?.exports?.params;
    });
    return parameters ?? null;
}

module.exports = { scriptParameters };