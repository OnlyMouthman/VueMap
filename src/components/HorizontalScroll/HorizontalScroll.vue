<template>
  <div
    class="container"
    ref="container"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
  >
    <div class="scroll-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalScroll',
  data() {
    return {
      isDragging: false,
      startX: 0,
      scrollLeft: 0,
    };
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.startX = event.pageX - this.$refs.container.offsetLeft;
      this.scrollLeft = this.$refs.container.scrollLeft;
    },
    onDrag(event) {
      if (!this.isDragging) return;
      event.preventDefault();
      const x = event.pageX - this.$refs.container.offsetLeft;
      const walk = x - this.startX;
      this.$refs.container.scrollLeft = this.scrollLeft - walk;
    },
    endDrag() {
      this.isDragging = false;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  overflow: hidden;
  cursor: grab;
}

.container:active {
  cursor: grabbing;
}

.scroll-container {
  display: flex;
  flex-direction: column;
}

/* 隐藏滚动条 */
.container::-webkit-scrollbar {
  display: none;
}

.container {
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
}
</style>