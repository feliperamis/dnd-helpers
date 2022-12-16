<script setup lang="ts">
import { Character } from '@/types/Character';
import type { HelperType } from '@/types/Helpers.type';
import { ref, computed, onMounted } from 'vue';
import { useClipboard } from '@vueuse/core';
import CharacterFormVue from '@/components/CharacterForm.vue';
import { usePageContext } from '#root/renderer/usePageContext';

const pageContext = usePageContext();
const character = ref(Character.createBasic());

const characterEncodeLife = computed(() => getCopyLink('life-helper'));
const characterEncodeAbility = computed(() => getCopyLink('ability-helper'));
const tooltipsVisible = ref({ 'ability-helper': false, 'life-helper': false });

const { copy } = useClipboard();

onMounted(() => {});

function getCopyLink(id: HelperType): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const fullLink = `${
    window.location.href
  }${id}?character=${character.value.encode()}`;

  return encodeURI(fullLink);
}

function copyClipboard(id: HelperType) {
  copy(getCopyLink(id));
  tooltipsVisible.value[id] = true;
  setTimeout(() => {
    tooltipsVisible.value[id] = false;
  }, 3000);
}

function onCharacterChange(data: Character) {
  character.value = data;
}
</script>

<template>
  <header>
    <img class="logo" src="@/assets/favicon.png" width="200" height="200" />
    <h2>Notion widget builder for D&D</h2>
    <h5>Build a dynamic character sheet on your Notion with these helpers</h5>
    <nav>
      <RLink path="life-helper">
        <font-awesome-icon icon="heart" color="red"></font-awesome-icon>
        Life helper
      </RLink>
      |
      <RLink path="ability-helper">
        <font-awesome-icon icon="list-check" color="purple"></font-awesome-icon>
        Ability helper
      </RLink>
    </nav>
    <div class="content">
      <CharacterFormVue
        :character="character"
        @on-character-change="onCharacterChange"
      />
      <div class="widget-links">
        <div>
          <input
            class="textinput"
            type="text"
            readonly
            :value="characterEncodeLife"
          />
          <button @click="copyClipboard('life-helper')">
            <font-awesome-icon icon="clipboard"></font-awesome-icon>
            <span v-if="tooltipsVisible['life-helper']" class="tooltip"
              >Copied!</span
            >
          </button>
          <a :href="characterEncodeLife" target="_blank">
            <font-awesome-icon
              icon="arrow-up-right-from-square"
            ></font-awesome-icon>
          </a>
        </div>
        <div>
          <input
            class="textinput"
            type="text"
            readonly
            :value="characterEncodeAbility"
          />
          <button @click="copyClipboard('ability-helper')">
            <font-awesome-icon icon="clipboard"></font-awesome-icon>
            <span v-if="tooltipsVisible['ability-helper']" class="tooltip"
              >Copied!</span
            >
          </button>
          <a :href="characterEncodeAbility" target="_blank">
            <font-awesome-icon
              icon="arrow-up-right-from-square"
            ></font-awesome-icon>
          </a>
        </div>
      </div>
    </div>
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
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  .widget-links {
    flex-grow: 50%;

    button {
      border-radius: 5px;
      border: 1px solid rgba(152, 147, 178, 0.3);
      line-height: 20px;
      font-size: 14px;
      padding: 5px 10px;
      margin: 5px 0;
      box-shadow: 0 2px 5px rgba(152, 147, 178, 0.3);
    }

    a {
      padding: 5px 5px;
    }
  }
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
