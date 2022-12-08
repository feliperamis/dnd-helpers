<script setup lang="ts">
import { Character } from '@/types/Character';
import { ref, onMounted, computed } from 'vue';
import { useClipboard } from '@vueuse/core';

const character = ref(Character.createBasic());

const newAbilityName = ref('');
const newAbilitySlots = ref(0);
const tooltipVisible = ref(false);
const characterEncodeLife = computed(() =>
  character.value.encode('life-helper')
);
const characterEncodeAbility = computed(() =>
  character.value.encode('ability-helper')
);

const { text, copy, copied, isSupported } = useClipboard();

function copyClipboard(id: string) {
  copy(character.value.encode(id));
  tooltipVisible.value = true;
  setTimeout(() => {
    tooltipVisible.value = false;
  }, 3000);
}

function addAbility(event: Event) {
  event.preventDefault();
  character.value.abilityList[newAbilityName.value] = newAbilitySlots.value;
}
</script>

<template>
  <header>
    <img class="logo" src="@/assets/favicon.png" width="200" height="200" />
    <h2>Notion widget builder for D&D</h2>
    <h5>Build a dynamic character sheet on your Notion with these helpers</h5>
    <div class="content">
      <div class="character-form">
        <div>
          <label for="">Name</label>
          <input type="text" v-model="character.name" />
        </div>
        <div>
          <label for="">Maximum life</label>
          <input type="text" v-model="character.life" />
        </div>
        <div>
          <label for="">List of abilities</label>
          <div v-for="(value, key) in character.abilityList" :key="key">
            <span>{{ key }}</span>
            <span>{{ value }}</span>
          </div>
          <form @submit="addAbility">
            <input type="text" v-model="newAbilityName" name="title" />
            <input
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              max="10"
              v-model="newAbilitySlots"
            />

            <button type="submit">Add new ability</button>
          </form>
        </div>
      </div>
      <div class="widget-links">
        <div>
          <input type="text" readonly :value="characterEncodeLife" />
          <button @click="copyClipboard('life-helper')">
            <font-awesome-icon icon="clipboard"></font-awesome-icon>
            <span v-if="tooltipVisible" class="tooltip">Copied!</span>
          </button>
          <a :href="characterEncodeLife" target="_blank">
            <font-awesome-icon
              icon="arrow-up-right-from-square"
            ></font-awesome-icon>
          </a>
        </div>
        <div>
          <input type="text" readonly :value="characterEncodeAbility" />
          <button @click="copyClipboard('ability-helper')">
            <font-awesome-icon icon="clipboard"></font-awesome-icon>
            <span v-if="tooltipVisible" class="tooltip">Copied!</span>
          </button>
          <a :href="characterEncodeAbility" target="_blank">
            <font-awesome-icon
              icon="arrow-up-right-from-square"
            ></font-awesome-icon>
          </a>
        </div>
      </div>
    </div>
    <nav>
      <RouterLink to="/life-helper">
        <font-awesome-icon icon="heart" color="red"></font-awesome-icon>
        Life helper
      </RouterLink>
      |
      <RouterLink to="/ability-helper">
        <font-awesome-icon icon="list-check" color="purple"></font-awesome-icon>
        Ability helper
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss">
.logo {
  display: block;
  margin: 0 auto 2rem;
}

h2 {
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: black;
  margin: 10px 0;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

nav {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 2rem;
  background-color: #b5b7d6;
  font-size: 15px;
  line-height: 40px;
  border-radius: 10px;
  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    text-decoration: none;
    color: #3b3561;

    &:hover {
      text-decoration: underline;
    }
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
}

nav a:first-of-type {
  border: 0;
}
</style>
