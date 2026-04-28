/* var imageConverter = {
    convert: function(){
        html2canvas(document.getElementById("acsbar")).then(function(canvas) {
            var link = document.createElement("a");
            document.body.appendChild(link);
            link.download = "acsbar.png";
            link.href = canvas.toDataURL();
            link.target = '_blank';
            link.click();
          });
    }
    
} */

/* ES6 */
/* import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from '../libs/node_modules/html-to-image'; */

/* ES5 */
/* var htmlToImage = require('html-to-image.js'); */

function convertHtmlToPng() {
    const acsBar = document.getElementById('acsbar');
    
    // fonts must be fully loaded first
    document.fonts.ready.then(() => {
        
        // scale up to stop blury text
        const scale = 2; 
        const style = {
            transform: 'scale(' + scale + ')',
            transformOrigin: 'top left',
            width: acsBar.offsetWidth + 'px',
            height: acsBar.offsetHeight + 'px'
        };

        const param = {
            height: acsBar.offsetHeight * scale,
            width: acsBar.offsetWidth * scale,
            quality: 1,
            style: style
        };

        // image generation
        domtoimage.toPng(acsBar, param)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = 'acsbar.png';
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                console.error('Oops, something went wrong!', error);
                alert("Failed to generate image. See console for details.");
            });
    });
}