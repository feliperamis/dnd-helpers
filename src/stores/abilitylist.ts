import { defineStore } from 'pinia';
import { useSessionStorage } from '@vueuse/core';
import type { Ability, AbilityList } from '@/types/Ability';

const abilityList = useSessionStorage('ability-list', {} as AbilityList);

export const useAbilityListStore = defineStore('abilitylist', () => {
  function addAbility(name: string, slots: number) {
    abilityList.value[name] = {
      maxSlots: slots,
      slots: new Array(slots).fill(false),
    };
  }

  function setAbilities(encodedAbilities: { [ability: string]: number }) {
    const abilities: AbilityList = {};

    Object.keys(encodedAbilities).forEach((ability) => {
      abilities[ability] = {
        maxSlots: encodedAbilities[ability],
        slots: new Array(encodedAbilities[ability]).fill(false),
      } as Ability;
    });

    abilityList.value = abilities;
  }

  function toggleSlot(abilityName: string, slotIndex: number) {
    if (slotIndex < abilityList.value[abilityName].maxSlots) {
      abilityList.value[abilityName].slots[slotIndex] =
        !abilityList.value[abilityName].slots[slotIndex];
    }
  }

  function resetAbilities() {
    Object.keys(abilityList.value).forEach((ability) => {
      abilityList.value[ability].slots = new Array(
        abilityList.value[ability].maxSlots
      ).fill(false);
    });
  }

  return { abilityList, addAbility, toggleSlot, resetAbilities, setAbilities };
});
