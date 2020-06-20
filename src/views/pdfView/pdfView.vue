<template>
  <div class="pdfView">
    <van-nav-bar title="pdf预览" left-text="返回" left-arrow @click-left="back" />
    <div class="content">
      <div class="pdfViewBox">
        <div class="view" id="canvas-wrap"></div>
      </div>
    </div>
  </div>
</template>

<script>
// pdfjs-dist/webpack 引入 解决worker.js 加载问题
import PDFJS from "pdfjs-dist";
// PDFJS.disableWorker = true
export default {
  name: "pdfView",
  data() {
    return {
      pdfContent: null, // pdf内容
      pdfPage: 0
    };
  },
  mounted() {
    this.getPdf();
    this.setViewport(true)
  },
  methods: {
    setViewport (bol = true) {
      if (bol) {
          document.getElementById("view").setAttribute('content','width=device-width,user-scalable=yes,viewport-fit=cover, minimum-scale=1.0');
      } else {
        document.getElementById("view").setAttribute('content','width=device-width,user-scalable=no,viewport-fit=cover, minimum-scale=1.0, maximum-scale=1.0');
      }
    },
    getPdf() {
      //   PDFJS.getDocument('http://yangjiajin.cn/static/file/1111.pdf').then(function (pdf) {
      //       console.log(pdf.numPages)
      //   })
      // dfdgdfsg.pdf
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      });
      PDFJS.getDocument({
        url: "http://yangjiajin.cn/static/file/60881c36e2a24171b3cb8fa05d33f484.pdf",
        // disableRange: false,
        // rangeChunkSize:65536,
        cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/",
        cMapPacked: true
      }).then(pdf => {
        if (pdf) {
          this.pdfContent = pdf;
          this.pdfPage = pdf.numPages;
          Promise.all(this.renderCanvas()).then(() => {
            this.$toast.clear()
          })
        } else {
          this.$toast.clear()
        }
      }).catch(err => {
        this.$toast.clear()
        console.log(err)
      });
    },
    renderCanvas() {
      const renderTasks = [];
      for (let i = 1; i <= this.pdfPage; i++) {
        renderTasks.push(this.appendPage(i));
      }
      return renderTasks;
    },
    appendPage(pageIndex) {
      return this.pdfContent.getPage(pageIndex).then(page => {
        let pdfScale = document.body.getBoundingClientRect().width / page.view[2]
        /* canvas实现方式 */
        // const viewport = page.getViewport(pdfScale)
        // // 在页面中创建canvas
        // const canvas = document.createElement('canvas')
        // canvas.id = 'canvas_' + pageIndex
        // document.getElementById('canvas-wrap').append(canvas)
        // const context = canvas.getContext('2d')
        // canvas.height = viewport.height
        // canvas.width = viewport.width
        // const renderContext = {
        //     canvasContext: context,
        //     viewport: viewport
        // }
        // return page.render(renderContext)

        /* svg实现方式 */
        let viewport = page.getViewport(pdfScale);
        let container = document.createElement("div");
        container.id = "canvas_" + pageIndex;
        container.className = "pageContainer";
        container.style.width = viewport.width + "px";
        container.style.height = viewport.height + "px";
        document.getElementById("canvas-wrap").appendChild(container);

        return page.getOperatorList().then(function(opList) {
          let svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
          return svgGfx.getSVG(opList, viewport).then(function(svg) {
            container.appendChild(svg);
          });
        });
      });
    }
  },
  beforeDestroy () {
    this.setViewport(false)
  }
};
</script>
<style lang="scss">
.pdfViewBox {
  width: 100%;
  position: relative;
  #canvas-wrap {
    width: 100%;
    text-align: center;
    // overflow: hidden;
  }
}
</style>

