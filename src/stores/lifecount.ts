import { defineStore } from 'pinia';
import { useSessionStorage } from '@vueuse/core';

const lifeCount = useSessionStorage('life-count', 0);
const maxLifeCount = useSessionStorage('max-life-count', 0);
const tempLifeCount = useSessionStorage('temp-life-count', 0);
export const useLifeCountStore = defineStore('lifecount', () => {
  function setLife(life: number) {
    lifeCount.value = life;
    maxLifeCount.value = life;
  }

  function setTempLife(tempLife: number) {
    if (tempLife >= 0) {
      tempLifeCount.value = tempLife;
    }
  }

  function incrementLife() {
    if (lifeCount.value < maxLifeCount.value) {
      lifeCount.value = lifeCount.value + 1;
    }
  }

  function substractLife() {
    if (tempLifeCount.value > 0) {
      tempLifeCount.value = tempLifeCount.value - 1;
      return;
    }

    if (lifeCount.value > 0) {
      lifeCount.value = lifeCount.value - 1;
    }
  }

  function rest() {
    lifeCount.value = maxLifeCount.value;
  }

  return {
    lifeCount,
    maxLifeCount,
    tempLifeCount,
    setLife,
    setTempLife,
    incrementLife,
    substractLife,
    rest,
  };
});
