<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
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
  <RouterView />
</template>

<style lang="scss">
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  padding-bottom: 20px;
  width: 100%;
  color: #9993b2;
  text-align: center;
  display: block;

  a {
    margin-right: 10px;
  }
}
</style>
