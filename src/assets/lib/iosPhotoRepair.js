let EXIF = require("exif-js")
// import EXIF from 'exif-js'
/**
 * @file 修复ios拍照旋转问题，依赖exif-js
 * @author yangjiajin6@gmail.com
 */

/**
 * 获取图片方向
 * 
 * @param {Blob} file 
 */
const getOri = function(file) {
    return new Promise(resolve => {
        EXIF.getData(file, function() {
            let orientation = EXIF.getTag(this, "Orientation");
            resolve(orientation)
        });
    })
}

/**
 * 图片旋转方法
 * @param {Document} img 
 * @param {Number} orientation 
 */
const imgToCanvas = function(img, orientation) {
    const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        targetWidth = img.targetWidth || img.width,
        targetHeight = img.targetHeight || img.height;
    
    if (orientation === 6) {
        canvas.width = targetHeight;
        canvas.height = targetWidth;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI / 180 * 90);
        ctx.drawImage(img, -targetWidth / 2, -targetHeight / 2, canvas.height, canvas.width);
    } else {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    return new Promise(resolve => {
        resolve(canvas)
    })
}

/**
 * sdf
 * @param {Blob} file 
 * @param {Number} ratio 
 */
const fixImgFile = function(file, ratio) {
    const ratios = ratio || 1

    return new Promise(resolve => {
        if (file.type.indexOf('image') === 0) {
            getOri(file).then(orientation => {
                let oReader = new FileReader();
                oReader.onload = function(e) {
                    let base64 = e.target.result;
                    let img = document.createElement('img');

                    img.onload = function() {
                        imgToCanvas(img, orientation).then(canvas => {
                            resolve(canvas.toDataURL('image/jpeg', ratios))
                        })
                    }
                    img.src = base64;
                }
                oReader.readAsDataURL(file);
            })
        }
    })

}
export default fixImgFile