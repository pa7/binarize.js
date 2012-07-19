/**
 * JavaScript Implementation of binarization with user defined global threshhold
 * by Patrick Wied
 */

(function(){

var data = [],
    width = 0,
    height = 0,
    binarizedData = [],
    threshhold = 0,
    binarize = function(){
        var i = 0, 
            len = data.length;

        // get the grayscale values + histogramm
        for(; i < len; i+=4){
            
            var r = data[i],
                g = data[i+1],
                b = data[i+2],
                luminance = ((0.21*r + 0.71*g + 0.07*b) >> 0);

               binarizedData.push((luminance < threshhold)?0:1);
        }

        return binarizedData;
    }

    



self.addEventListener('message', function(e){
    var e = e.data;
    width = e.width;
    height = e.height;
    data = e.data;
    threshhold = e.params.threshhold || 150;
    
    
    self.postMessage(binarize());
    self.close();
}, false);


}());
