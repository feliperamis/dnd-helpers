<template>
  <div class="layout">
    <slot />
  </div>
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

<script lang="ts" setup></script>

<style lang="scss">
footer {
  margin-top: 100px;
  margin-bottom: 40px;
  width: 100%;
  color: #9993b2;
  text-align: center;
  display: block;

  a {
    margin-right: 10px;
  }
}

.layout {
  min-height: 600px;
}
</style>
