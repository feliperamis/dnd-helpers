<script setup lang="ts">
import { Character } from '@/types/Character';
import type { HelperType } from '@/types/Helpers.type';
import { ref, computed, onMounted } from 'vue';
import { useClipboard } from '@vueuse/core';
import CharacterFormVue from '@/components/CharacterForm.vue';
import ClientOnlyVue from '@/components/ClientOnly.vue';

const character = ref(Character.createBasic());
const characterEncodeLife = computed(() => getCopyLink('life-helper'));
const characterEncodeAbility = computed(() => getCopyLink('ability-helper'));
const { copy } = useClipboard();
const tooltipsVisible = ref({ 'ability-helper': false, 'life-helper': false });

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

onMounted(() => {
  character.value.life = 1; //Force computed values to be filled with the new link
});
</script>

<template>
  <header>
    <img class="logo" src="@/assets/favicon.png" width="200" height="200" />
    <h2>Notion widget builder for D&D</h2>
    <h5>Build a dynamic character sheet on your Notion with these helpers</h5>
    <ClientOnlyVue>
      <nav>
        <a :href="characterEncodeLife">
          <font-awesome-icon icon="heart" color="red"></font-awesome-icon>
          <h3>Life helper</h3>
        </a>
        <a :href="characterEncodeAbility">
          <font-awesome-icon
            icon="list-check"
            color="purple"
          ></font-awesome-icon>
          <h3>Ability helper</h3>
        </a>
      </nav>
    </ClientOnlyVue>

    <div class="content">
      <CharacterFormVue
        :character="character"
        @on-character-change="onCharacterChange"
      />
      <div class="widget-links">
        <div>
          <ClientOnlyVue>
            <font-awesome-icon icon="heart" color="red"></font-awesome-icon>
          </ClientOnlyVue>
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
          <ClientOnlyVue>
            <font-awesome-icon
              icon="list-check"
              color="purple"
            ></font-awesome-icon>
          </ClientOnlyVue>
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
    <a
      class="credits"
      href="https://www.flaticon.com/free-icons/d20"
      title="d20 icons"
      ><i>D20 icons created by Freepik - Flaticon</i></a
    >
  </footer>
</template>

<style lang="scss">
.logo {
  display: block;
  margin: 0 auto 2rem;
}
header {
  min-height: 400px;
}
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

  .credits {
    display: block;
    padding: 1rem;
    border-left: 1px solid var(--color-border);
    text-decoration: none;
    color: #9993b2;
  }
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
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  .widget-links {
    margin-top: 10px;
    flex-direction: column;
    flex-grow: 40%;

    input {
      margin-left: 5px;
    }

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

    h3 {
      padding: 0;
      display: inline-flex;
      margin-left: 10px;
      color: #fff;
      text-decoration: inherit;
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    width: 80%;
    margin: 1;
  }
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}
</style>
