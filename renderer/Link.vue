<template>
  <a :class="{ active: pageContext.urlPathname === $attrs.href }" :href="href">
    <slot />
  </a>
</template>
<style scoped>
a {
  padding: 3px 10px;
}
a.active {
  background-color: #eee;
}
</style>
<script lang="ts" setup>
import { usePageContext } from './usePageContext';
import { ref, computed } from 'vue';
const base = import.meta.env.BASE_URL;

const pageContext = usePageContext();
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const path = ref(props.path);
const href = computed(() => base + path.value);
</script>
