import type { Ability, AbilityList } from './Ability';
import { useRouter, useRoute } from 'vue-router';

export class Character {
  constructor(
    public life: number,
    public name: string,
    public abilityList: {
      [ability: string]: number;
    }
  ) {}

  encode(page: string): string {
    const router = useRouter();
    const route = useRoute();

    const link = router.resolve(page);
    const fullLink = `${window.location.href}${
      link.name as string
    }?character=${btoa(JSON.stringify(this))}`;
    console.log(fullLink);

    return encodeURI(fullLink);
  }
  static fromEncode(encode: string): Character {
    const data = JSON.parse(atob(encode));

    return new Character(
      data.life ?? 1,
      data.name ?? 'Character',
      data.abilities ?? {}
    );
  }

  static createBasic(): Character {
    return new Character(1, 'My Character Name', {});
  }
}
