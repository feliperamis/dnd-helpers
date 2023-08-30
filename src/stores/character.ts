import { defineStore } from 'pinia';
import { useLocalStorage, useSessionStorage } from '@vueuse/core';

const character = useLocalStorage('character', '');

export const useCharactersStore = defineStore('character', () => {
  function setCharacter(newName: string) {
    character.value = newName;
  }

  function isCharacterInStore(characterName: string): boolean {
    return character.value === characterName;
  }

  return {
    character,
    setCharacter,
    isCharacterInStore,
  };
});
