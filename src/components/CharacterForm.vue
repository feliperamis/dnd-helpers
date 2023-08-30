<script setup lang="ts">
import { Character } from '@/types/Character';
import { ref, watch } from 'vue';

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

const newAbilityName = ref('');
const newAbilitySlots = ref<number | null>(null);

function onChange() {
  emit('on-character-change', character.value);
}

function addAbility(event: Event) {
  event.preventDefault();
  if (
    newAbilityName.value &&
    newAbilitySlots.value &&
    newAbilitySlots.value > 0 &&
    newAbilitySlots.value <= 10
  ) {
    character.value.abilityList[newAbilityName.value] = newAbilitySlots.value;
    newAbilityName.value = '';
    newAbilitySlots.value = 0;
  }

  onChange();
}

function removeAbility(abilityName: string) {
  delete character.value.abilityList[abilityName];
}
</script>

<template>
  <div class="character-form">
    <div class="character-form__input">
      <label for="">Name</label>
      <input
        class="textinput"
        type="text"
        v-model="character.name"
        @keydown="onChange"
      />
    </div>
    <div class="character-form__input">
      <label>Maximum life</label>
      <input
        class="textinput"
        type="number"
        min="1"
        v-model.number="character.life"
        @keydown="onChange"
      />
    </div>
    <div class="character-form__list">
      <label>List of abilities</label>
      <table class="character-form__list__table">
        <thead>
          <tr class="character-form__list__table__header">
            <th scope="col">Ability name</th>
            <th scope="col">Ability points</th>
            <th scope="col">
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
            v-for="(value, key, i) in character.abilityList"
            :key="key"
          >
            <td data-label="Ability name">
              <input class="textinput" type="text" :value="key" name="title" />
            </td>

            <td data-label="Ability points">
              <input
                class="textinput"
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
                max="10"
                :value="value"
              />
            </td>

            <td data-label="">
              <font-awesome-icon
                @click="removeAbility(key as string)"
                icon="trash"
                color="#e3170a"
                class="clickable-icon"
              ></font-awesome-icon>
            </td>
          </tr>
          <tr class="character-form__list__table__new">
            <td data-label="Ability name">
              <input
                class="textinput"
                type="text"
                v-model="newAbilityName"
                name="title"
                @keyup.enter="addAbility"
              />
            </td>
            <td data-label="Ability points">
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

<style lang="scss">
.character-form {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__input {
    flex-direction: column;
    display: flex;
    margin-bottom: 20px;
    width: 70%;

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
    flex-direction: column;
    border-radius: 3px;

    &__table__new td {
      background-color: rgb(239, 239, 239);
    }
    /*
    &__table {
      margin-top: 5px;
      border-collapse: collapse;
      border-radius: 3px;
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
    */

    table {
      border: 1px solid #ccc;
      border-collapse: collapse;
      margin-top: 10px;
      padding: 0;
      table-layout: fixed;
      font-size: 0.9em;
      font-family: sans-serif;
    }

    table tr {
      background-color: #b5b7d6;
      border: 1px solid #ddd;
      padding: 0.35em;
    }

    table th,
    table td {
      padding: 12px 15px;
      text-align: center;
      vertical-align: middle;
    }

    @media screen and (max-width: 500px) {
      table {
        border: 0;
        width: 90%;
      }

      table thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      table tr {
        border-bottom: 3px solid #ddd;
        display: block;
        margin-bottom: 0.625em;
      }

      table td {
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: 0.8em;
        text-align: right;
      }

      table td::before {
        /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
        content: attr(data-label);
        padding: 12px 15px;
        float: left;
        font-size: 14px;
        font-family: sans-serif;
        font-weight: bold;
      }

      table td:last-child {
        border-bottom: 0;
      }
    }
  }

  @media (max-width: 500px) {
    &__input {
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
    }
  }
}

.clickable-icon {
  width: 21px;
  height: 21px;
  text-align: start;
}
</style>
