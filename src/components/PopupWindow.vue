<template>
    <div class="popup-window" v-bind:style="{top: top + 'px', left: left + 'px', width: width + 'px', height: height + 'px'}" ref="popupWindow">
      <div class="popup-header" @mousedown="startDrag">
        <span class="title">{{popupTitle}}</span>
        <button class="close-btn" @click="$emit('close')">X</button>
      </div>
      <div class="popup-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        top: 100,
        left: 100,
        width: 500,
        height: 300,
        isDragging: false,
        isResizing: false,
        dragStartX: 0,
        dragStartY: 0,
        resizeStartX: 0,
        resizeStartY: 0,
        title: ""
      };
    },
    props: {
        popupTitle: String
    },
    methods: {
      startDrag(event) {
        this.isDragging = true;
        this.dragStartX = event.clientX - this.left;
        this.dragStartY = event.clientY - this.top;
        document.addEventListener('mousemove', this.onDrag);
        document.addEventListener('mouseup', this.stopDrag);
      },
      onDrag(event) {
        if (this.isDragging) {
          this.left = event.clientX - this.dragStartX;
          this.top = event.clientY - this.dragStartY;
        }
      },
      stopDrag() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('mouseup', this.stopDrag);
      }
    }
  };
  </script>
  
  <style scoped>
  .popup-window {
    position: absolute;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
    overflow: hidden;
    resize: both;
  }
  
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    padding: 10px;
    cursor: move;
  }
  
  .popup-content {
    padding: 20px;
  }
  
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  </style>