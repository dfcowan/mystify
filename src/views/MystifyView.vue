<template>
  <canvas id="canvas" style="background-color: black;"></canvas>
  Fade Rate <input v-model="fadeRate" type="range" min="0" max="100" />&nbsp;{{ fadeRate }}<br>
  <template v-if="fadeRate == 0">
    Show Black Count <input v-model="showBlackCount" type="checkbox" /><br>
    <template v-if="showBlackCount">
      Stop at zero <input v-model="stopAtZero" type="checkbox" /><br>
    </template>
  </template>
  Number of Points <input v-model="pointCount" type="range" min="2" max="10"/>&nbsp;{{ pointCount }}<br>
  Rotate Colors <input v-model="rotateColors" type="checkbox" /><br>
  <template v-if="!rotateColors">
    Color <input v-model="hue" type="range" min="0" max="360" />
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
  },
  data () {
    return {
      ctx: null as null | CanvasRenderingContext2D,
      width: 0,
      height: 0,
      pointCount: 4,
      labelWidth: 0,
      xs: [] as number[],
      ys: [] as number[],
      xSpeeds: [] as number[],
      ySpeeds: [] as number[],
      hue: 0,
      timer: 0,
      fadeRate: 10,
      showBlackCount: false,
      rotateColors: true,
      stopAtZero: false,
    }
  },
  methods: {
    initContext() {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      if (!canvas) {
        console.log('no canvas - setting timeout')
        setTimeout(this.initContext, 250)
        console.log('no canvas - returning')
        return
      }

      this.handleResize()
      //window.onresize = this.handleResize

      console.log('setting context')
      this.ctx = canvas.getContext('2d')

      this.timer = window.setTimeout(this.step, 250)
    },
    handleResize() {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      if (!canvas) {
        console.log('handleResize - no canvas')
        return
      }
      console.log('handleResize - setting dimensions')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      this.width = canvas.width
      this.height = canvas.height
    },
    getRandomSpeed() : number {
      const MAX_SPEED = 12

      let s = Math.floor(Math.random() * MAX_SPEED)
      while (s < 5) {
        s = Math.floor(Math.random() * MAX_SPEED)
      }
      return s
    },
    arrayNumber (a: number[], i: number) : number {
      return a[i] as number
    },
    step() {
      if (!this.ctx) {
        console.log('no context')
        return
      }

      const ctx = this.ctx
      ctx.save()

      if (this.fadeRate === 0)
      {
        // total clear
        // ctx.clearRect(0, 0, this.width, this.height);
      }
      else
      {
        // trailing effect
        ctx.fillStyle = "rgb(0 0 0 / " + this.fadeRate + "%)";
        ctx.fillRect(0, 0, this.width, this.height);
      }
      const xs = this.xs
      const ys = this.ys
      const xSpeeds = this.xSpeeds
      const ySpeeds = this.ySpeeds

      while (xs.length < this.pointCount) {
          xs.push(Math.floor(Math.random() * this.width))
          ys.push(Math.floor(Math.random() * this.height))

          xSpeeds.push(this.getRandomSpeed())
          ySpeeds.push(this.getRandomSpeed())
      }

      while(xs.length > this.pointCount) {
        xs.pop()
        ys.pop()
        xSpeeds.pop()
        ySpeeds.pop()
      }

        for (let i = 0; i<xs.length; i++) {
          xs[i] = this.arrayNumber(xs, i) + this.arrayNumber(xSpeeds, i)
          if (this.arrayNumber(xs, i) >= this.width || this.arrayNumber(xs,i) <= 0) {
            xSpeeds[i] = -1 * this.arrayNumber(xSpeeds, i)

            // if (this.arrayNumber(xs, i) >= this.width) {
            //   xs[i] = this.width
            // } else {
            //   xs[i] = 0
            // }
          }

          ys[i] = this.arrayNumber(ys, i) + this.arrayNumber(ySpeeds, i)
          if (this.arrayNumber(ys, i) >= this.height || this.arrayNumber(ys,i) <= 0) {
            ySpeeds[i] = -1 * this.arrayNumber(ySpeeds, i)

            // if (this.arrayNumber(ys, i) >= this.height) {
            //   ys[i] = this.height
            // } else {
            //   ys[i] = 0
            // }
          }
        }


      ctx.beginPath()
      ctx.moveTo(this.arrayNumber(xs, 0), this.arrayNumber(ys, 0))
      for (let i = 1; i<xs.length; i++) {
        ctx.lineTo(this.arrayNumber(xs, i), this.arrayNumber(ys, i))
      }
      ctx.lineTo(this.arrayNumber(xs, 0), this.arrayNumber(ys, 0))

      ctx.lineWidth = 2;

      if (this.rotateColors) {
        this.updateColor(0.5)
      }

      ctx.strokeStyle = 'hsl(' + this.hue + ', 100%, 50%)'

      ctx.stroke();

      if (this.fadeRate != 0)
      {
        this.showBlackCount = false
        this.stopAtZero = false
      }

      if (!this.showBlackCount) {
        this.stopAtZero = false
      }

      let numberOfBlackPixels = 0
      if (this.fadeRate == 0 && this.showBlackCount)
      {
        const imageData = ctx.getImageData(0, 0, this.width, this.height);
        const data = imageData.data;
        numberOfBlackPixels = 0
        for (let i = 0; i < data.length; i += 4) {
          if (!(data[i] || data[i + 1] || data[i + 2])) {
            numberOfBlackPixels++
          }
        }
        //console.log('black pixels = ' + numberOfBlackPixels)

        ctx.font = '24px monospace'
        ctx.textAlign = 'center'
        let txt = numberOfBlackPixels.toLocaleString()
        if (this.labelWidth === 0) {
          this.labelWidth = ctx.measureText(txt).width
        }
        ctx.fillStyle = '#444444'
        ctx.fillRect(5, 5, this.labelWidth + 10, 35)

        ctx.fillStyle = 'white'
        ctx.fillText(txt, this.labelWidth / 2 + 10, 30)
      }
      ctx.restore()

      if (!this.stopAtZero || numberOfBlackPixels > 0) {
        this.timer = window.setTimeout(this.step, 50)
      }
    },
    updateColor(increment: number) {
      this.hue += increment
      if (this.hue > 360) {
        this.hue = 0
      }
    }
  },
  created () {
    this.initContext()
  },
  beforeUnmount () {
    window.clearTimeout(this.timer)
  }
})
</script>

<style>
html, body, canvas {
    overflow: hidden;
}
</style>