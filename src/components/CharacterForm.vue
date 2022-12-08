<script setup lang="ts">
import { Character } from '@/types/Character';
import { ref, onMounted, computed, watch } from 'vue';

const props = defineProps({
  character: {
    type: Character,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'on-character-change', newCharacterData: Character): void;
}>();
const character = ref(props.character);

watch(character, async (oldCharacter, newCharacter) => {
  emit('on-character-change', newCharacter);
});

const newAbilityName = ref('');
const newAbilitySlots = ref(0);

function addAbility(event: Event) {
  event.preventDefault();
  if (newAbilityName.value && newAbilitySlots.value > 0) {
    character.value.abilityList[newAbilityName.value] = newAbilitySlots.value;
    newAbilityName.value = '';
    newAbilitySlots.value = 0;
  }
}

function removeAbility(abilityName: string) {
  delete character.value.abilityList[abilityName];
}
</script>

<template>
  <div class="character-form">
    <div class="character-form__input">
      <label for="">Name</label>
      <input class="textinput" type="text" v-model="character.name" />
    </div>
    <div class="character-form__input">
      <label for="">Maximum life</label>
      <input class="textinput" type="text" v-model.number="character.life" />
    </div>
    <div class="character-form__list">
      <label for="">List of abilities</label>

      <table class="character-form__list__table">
        <thead>
          <tr class="character-form__list__table__header">
            <th>Ability name</th>
            <th>Ability points</th>
            <th>
              <font-awesome-icon
                icon="ellipsis"
                width="21"
                height="21"
              ></font-awesome-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="character-form__list__table__active"
            v-for="(value, key) in character.abilityList"
            :key="key"
          >
            <td>
              <input
                class="textinput"
                type="text"
                :value="key"
                name="title"
                readonly
              />
            </td>

            <td>
              <input
                class="textinput"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                max="10"
                :value="value"
              />
            </td>

            <td>
              <font-awesome-icon
                @click="removeAbility(key as string)"
                icon="trash"
                color="#e3170a"
                class="clickable-icon"
              ></font-awesome-icon>
            </td>
          </tr>
          <tr class="character-form__list__table__new">
            <td>
              <input
                class="textinput"
                type="text"
                v-model="newAbilityName"
                name="title"
                @keyup.enter="addAbility"
              />
            </td>
            <td>
              <input
                class="textinput"
                type="number"
                v-model="newAbilitySlots"
                @keyup.enter="addAbility"
              />
            </td>
            <td>
              <font-awesome-icon
                @click="addAbility"
                icon="circle-plus"
                color="#5C946E"
                class="clickable-icon"
              ></font-awesome-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.character-form {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__input {
    flex-direction: row;
    margin-bottom: 20px;

    * {
      flex-basis: 1;
      display: flex;
      flex-grow: 100%;
    }
  }

  label {
    font-weight: bold;
  }

  &__list {
    display: flex;
    flex-direction: column;
    border-radius: 3px;

    &__table {
      border-collapse: collapse;
      border-radius: 3px;
      margin: 25px 0;
      font-size: 0.9em;
      font-family: sans-serif;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

      thead tr {
        border-radius: 3px;

        background-color: #b5b7d6;
        color: #ffffff;
        text-align: left;
      }

      th,
      td {
        padding: 12px 15px;
      }

      tbody tr {
        border-bottom: 1px solid #dddddd;
      }

      tbody tr:last-of-type {
        background-color: rgba(152, 147, 178, 0.3);
      }
    }
  }
}

.clickable-icon {
  width: 21px;
  height: 21px;
  text-align: start;
}
</style>
