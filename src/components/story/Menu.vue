<template>
    <v-menu
      offset-y
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="onEdit">
          <v-list-item-title>수정하기</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onDelete">
          <v-list-item-title>삭제하기</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits(['edit', 'delete']);
  
  const onEdit = () => {
    emit('edit');
  };
  
  const onDelete = () => {
    emit('delete');
  };
  </script>
  
  <style scoped>
  .v-btn {
    border-radius: 50%;
  }
  .v-list-item {
    background-color: black;
    color: white;
    border-radius: 15px;
    margin: 5px 0;
  }
  </style>
  