import { defineStore } from 'pinia';
import { useSessionStorage } from '@vueuse/core';

const character = useSessionStorage('character', '');

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
