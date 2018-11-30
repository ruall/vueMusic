<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <div class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex===index}"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from "../../common/js/dem";

  export default {
    name: "slider",
    data() {
      return {
        dots: [],
        currentPageIndex: 0,
      }
    },
    props: {
      loop: {
        //是否循环轮播
        type: Boolean,
        default: true,
      },
      autoPlay: {
        //是否自动轮播
        type: Boolean,
        default: true,
      },
      interval: {
        //轮播时长
        type: Number,
        default: 4000,
      },
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        if (this.autoPlay) {
          this._play();
        }
      }, 20);

      /**
       * 当页面宽度发生变化的时候重新设置宽度
       * */
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true);
        //设置完宽度以后重新初始化slider组件
        this.slider.refresh();
      })
    },
    methods: {
      _setSliderWidth(isResize) {
        //获取slider子元素的对象
        this.children = this.$refs.sliderGroup.children;
        let width = 0;

        //获取slider标签的宽度
        let sliderWidth = this.$refs.slider.clientWidth;

        for (let i = 0; i < this.children.length; i++) {
          //获取单个子元素的对象并添加class
          let child = this.children[i];
          addClass(child, 'slider-item');
          //给子元素添加宽度
          child.style.width = sliderWidth + 'px';
          //给width累加
          width += sliderWidth;
        }
        if (this.loop && !isResize) {
          //如果是循环轮播，第一次加载时需要同时加载左右两边的宽度
          width += 2 * sliderWidth
        }
        //给整个轮播组件设置总宽度
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400,
          }
        });
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX;
          //循环轮播的时候自动减去头尾添加的dom数，更新后不需要了
          /*if(this.loop){
            pageIndex -= 1;
          }*/
          this.currentPageIndex = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this._play()
          }
        })
      },
      _play() {
        let pageIndex;
        if (this.currentPageIndex === this.children.length - 3) {
          pageIndex = 0;
        } else {
          pageIndex = this.currentPageIndex + 1;
        }

        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    destroyed(){
      //当离开当前页面触发销毁destroyed的时候，
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
