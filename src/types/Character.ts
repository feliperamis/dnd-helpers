export class Character {
  constructor(
    public life: number,
    public name: string,
    public abilityList: {
      [ability: string]: number;
    }
  ) {}

  encode(): string {
    return btoa(
      JSON.stringify({
        life: this.life,
        name: this.name,
        abilityList: this.abilityList,
      } as CharacterEncoded)
    );
  }

  static fromEncode(encode: string): Character {
    const data = JSON.parse(atob(encode)) as CharacterEncoded;

    return new Character(
      data.life ?? 1,
      data.name ?? 'Character',
      data.abilityList ?? {}
    );
  }

  static createBasic(): Character {
    return new Character(1, 'My Character Name', {});
  }
}

type CharacterEncoded = {
  abilityList: {
    [ability: string]: number;
  };
  life: number;
  name: string;
};
