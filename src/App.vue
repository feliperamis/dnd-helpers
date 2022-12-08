<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
  <footer>
    <a href="https://github.com/feliperamis/dnd-helpers">
      <img
        src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        alt="Github
      icon"
        width="16"
        height="16"
      />
    </a>
    <span>Felipe Ramis</span>
  </footer>
</template>

<style lang="scss">
footer {
  position: fixed;
  margin-top: 40px;
  margin-bottom: 40px;
  left: 0;
  bottom: 0;
  width: 100%;
  color: #9993b2;
  text-align: center;
  display: block;

  a {
    margin-right: 10px;
  }
}
</style>
