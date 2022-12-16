<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue';
import { useLifeCountStore } from '@/stores/lifecount';
import { useCharactersStore } from '@/stores/character';
import { useUrlSearchParams } from '@vueuse/core';
import { ref, onMounted } from 'vue';
import { StoreService } from '@/services/StoreService';

const lifeStore = useLifeCountStore();
const characterStore = useCharactersStore();
const hasCharacter = ref(false);
const editingTemp = ref(false);
const inputTemp = ref(null);

onMounted(() => {
  const params = useUrlSearchParams('history');
  if (params.character && typeof params.character === 'string') {
    StoreService.setStoreDataFromCharacter(params.character);
    hasCharacter.value = true;
  }
});
</script>

<template>
  <div class="life-helper">
    <div v-if="!hasCharacter">
      <span></span>
      <RLink path=""> Setup a character first! </RLink>
    </div>
    <template v-else>
      <h5>
        <font-awesome-icon icon="heart" color="red"></font-awesome-icon> HIT
        POINTS {{ characterStore.character }}
      </h5>
      <div class="life-helper__block">
        <div class="life-helper__block__actions">
          <button @click="lifeStore.incrementLife()" id="heal">Heal 1</button>
          <button @click="lifeStore.substractLife()" id="damage">
            Damage 1
          </button>
        </div>
        <div class="life-helper__block__hp">
          <label>HP</label>
          <div>
            <span
              >{{ lifeStore.lifeCount }} / {{ lifeStore.maxLifeCount }}</span
            >
          </div>
        </div>
        <div class="life-helper__block__temphp">
          <label>Temp HP</label>
          <div v-if="!editingTemp">
            <span>{{ lifeStore.tempLifeCount }}</span>
            <font-awesome-icon
              @click="editingTemp = true"
              class="clickable-icon"
              icon="pen-to-square"
              color="gray"
            ></font-awesome-icon>
          </div>
          <div v-else>
            <input
              ref="inputTemp"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              v-focus
              v-model.number="lifeStore.tempLifeCount"
              @focusout="editingTemp = false"
              @change="editingTemp = false"
            />
          </div>
        </div>
      </div>
      <button id="rest" @click="lifeStore.rest()">
        <font-awesome-icon icon="bed"></font-awesome-icon>
        <span>Long rest</span>
      </button>
    </template>
  </div>
</template>

<style lang="scss">
.life-helper {
  width: 300px;
  margin-left: auto;
  margin-right: auto;

  h5 {
    font-weight: bold;
    color: black;
  }

  &__block {
    border: 1px solid #e3170a;
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    margin-bottom: 10px;
    * {
      display: flex;
      flex-direction: column;
    }

    &__actions button {
      &:active {
        box-shadow: 0 1px #666;
        transform: translateY(1px);
      }

      &#heal {
        background-color: #5c946e;
        border: 1px solid #5c946e;
        margin-bottom: 5px;
      }

      &#damage {
        background-color: #e3170a;
        border: 1px solid #e3170a;
      }
    }

    &__hp,
    &__temphp {
      justify-content: space-around;
      text-align: center;

      label {
        color: #9993b2;
      }

      span {
        font-size: 24px;
      }

      div {
        flex-direction: row;
        text-align: center;
        justify-content: center;

        svg {
          margin-left: 6px;
          margin-top: auto;
          margin-bottom: auto;
        }
      }

      input {
        display: flex;
        padding: 0;
        width: 40px;
      }
    }
  }

  button {
    border-radius: 10px;
    color: #fff;
    padding: 10px;
    cursor: pointer;

    &#rest {
      background-color: #3b3561;
      span {
        margin-left: 5px;
      }
    }

    &:active {
      box-shadow: 0 1px #666;
      transform: translateY(1px);
    }
  }
}
</style>
