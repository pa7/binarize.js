(function(g){

    var binarize = (function(){
        var doc = g.document,
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            configure = function(config){
                canvas.width = config.width || config.image.width;
                canvas.height = config.height || config.image.height;
                ctx.drawImage(config.image, 0, 0);
            },
            startWorker = function(config){
                var type = config.type || "otsu",
                    width = canvas.width,
                    height = canvas.height,
                    worker = new Worker(type+".js"),
                    params = config.params,
                    data = ctx.getImageData(0, 0, width, height);

                worker.postMessage({
                    width: width,
                    height: height,
                    // implementation specific parameters
                    params: params,
                    data: data
                });

                worker.onmessage = function(e){
                    config.callback && config.callback(e);
                };  

            };
    

        return function(config){
            configure(config);
            startWorker(config);
        };
    })();
    
    g.binarize = binarize;

})(this);
