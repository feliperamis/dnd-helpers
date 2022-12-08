import { useAbilityListStore } from '@/stores/abilitylist';
import { useCharactersStore } from '@/stores/character';
import { useLifeCountStore } from '@/stores/lifecount';
import { Character } from '@/types/Character';

export class StoreService {
  public static setStoreDataFromCharacter(data: string): Character {
    const lifeStore = useLifeCountStore();
    const characterStore = useCharactersStore();
    const abilitiesStore = useAbilityListStore();

    const character = Character.fromEncode(data);

    if (!characterStore.isCharacterInStore(character.name)) {
      // New character
      characterStore.setCharacter(character.name);
      lifeStore.setLife(character.life);
      abilitiesStore.setAbilities(character.abilityList);
    }

    return character;
  }
}
