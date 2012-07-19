/**
 * JavaScript Implementation of Otsu binarization method 
 * by Patrick Wied
 */

(function(){

var data = [],
    width = 0,
    height = 0,
    luminances = [],
    histogram = [],
    binarizedData = [],
    binarize = function(){
        var i = 0, 
            len = data.length,
            all = width * height;

        // get the grayscale values + histogramm
        for(; i < len; i+=4){
            
            var r = data[i],
                g = data[i+1],
                b = data[i+2],
                luminance = ((0.21*r + 0.71*g + 0.07*b) >> 0);

            luminances.push(luminance);

            if(!histogram[luminance]){
                histogram[luminance] = 1;
            }else{
                histogram[luminance] += 1;
            }

        }

        var sum = 0, i = 256,
            sumB = 0,
            wB = 0,
            wF = 0,
            varianceMax = 0,
            threshhold = 0;
        
        i=0;
        for(; i < histogram.length; i++){
            var currentHistogram = histogram[i] || 0;
            sum += (i * currentHistogram);            
        }
        
        for(i=0; i < 255; i++){
            var currentHistogram = histogram[i] || 0;

            wB += currentHistogram;
            if(wB == 0) continue;
            wF = all - wB;
            if(wF == 0) break;

            sumB += (i * currentHistogram);

            var mB = sumB / wB,
                mF = (sum - sumB) / wF,
                varianceBetween = wB * wF * (mB - mF) * (mB - mF);

            if(varianceBetween > varianceMax){
                varianceMax = varianceBetween;
                threshhold = i;
            }

        }

        
        i = 0;
        len = luminances.length;
        for(; i < len; i++){
            binarizedData.push((luminances[i] < threshhold)?0:1);
        }

        return binarizedData;
    }

    



self.addEventListener('message', function(e){
    var e = e.data;
    width = e.width;
    height = e.height;
    data = e.data;
    
    
    self.postMessage(binarize());
    self.close();
}, false);


}());
