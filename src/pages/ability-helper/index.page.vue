<script setup lang="ts">
import { useCharactersStore } from '@/stores/character';
import { useUrlSearchParams } from '@vueuse/core';
import { ref, onMounted } from 'vue';
import { StoreService } from '@/services/StoreService';
import { useAbilityListStore } from '@/stores/abilitylist';

const hasCharacter = ref(false);
const abilityStore = useAbilityListStore();
const characterStore = useCharactersStore();

onMounted(() => {
  const params = useUrlSearchParams('history');
  if (params.character && typeof params.character === 'string') {
    StoreService.setStoreDataFromCharacter(params.character);
    hasCharacter.value = true;
  }
});
</script>

<template>
  <div class="ability-helper">
    <div v-if="!hasCharacter">
      <span></span>
      <RLink path=""> Setup a character first! </RLink>
    </div>
    <template v-else>
      <h5>
        <font-awesome-icon icon="list-check" color="purple"></font-awesome-icon>
        ABILITY POINTS {{ characterStore.character }}
      </h5>
      <div class="ability-helper__block">
        <div
          v-for="(ability, index) in Object.keys(abilityStore.abilityList)"
          :key="index"
          class="ability-helper__block__ability"
        >
          <span>{{ ability }}</span>
          <div class="ability-helper__block__ability__slots">
            <div
              v-for="(slot, slotIndex) in abilityStore.abilityList[ability]
                .slots"
              :key="slotIndex"
            >
              <input
                type="checkbox"
                :checked="slot"
                @change="abilityStore.toggleSlot(ability, slotIndex)"
              />
            </div>
          </div>
        </div>
      </div>
      <button id="rest" @click="abilityStore.resetAbilities()">
        <font-awesome-icon icon="bed"></font-awesome-icon>
        <span>Long rest</span>
      </button>
    </template>
  </div>
</template>

<style lang="scss">
.ability-helper {
  width: 50%;
  margin-left: auto;
  font-size: 20px;
  vertical-align: middle;
  margin-right: auto;

  @media (max-width: 1200px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 500px) {
    width: 100%;
    font-size: 16px;
  }

  h5 {
    font-weight: bold;
    color: black;
  }

  &__block {
    border: 1px solid #3b3561;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-bottom: 10px;

    &__ability {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      justify-content: space-between;

      &:last-child {
        margin-bottom: 0;
      }

      span {
        display: flex;
        flex: 30%;
        margin-right: 10px;
        font-weight: bold;
        justify-content: center;
        align-self: center;
        padding-bottom: 2px;
      }

      &__slots {
        display: flex;
        flex: 60%;
        flex-wrap: wrap;
        input {
          width: 30px;
          height: 30px;
          margin: 0 4px;
          border-radius: 10px;

          &:checked {
            appearance: none;
            background-color: #3b3561;
            color: white;
            animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);
          }

          &:checked::before {
            animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1)
              forwards;
          }
        }
      }
    }
  }

  button {
    border-radius: 10px;
    color: #fff;
    padding: 10px;
    cursor: pointer;

    &:active {
      box-shadow: 0 1px #666;
      transform: translateY(1px);
    }

    &#rest {
      background-color: #3b3561;
      span {
        margin-left: 5px;
      }
    }
  }
}

@keyframes shrink-bounce {
  0% {
    transform: scale(0.1);
  }
  33% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes checkbox-check {
  0% {
    width: 0;
    height: 0;
    background-color: #3b3561;
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  33% {
    width: 0.2em;
    height: 0;
    background-color: #3b3561;
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  100% {
    width: 0.2em;
    height: 0.5em;
    background-color: #3b3561;
    transform: translate3d(0, -0.5em, 0) rotate(45deg);
  }
}
</style>
