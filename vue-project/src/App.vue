<!-- <template>
  <div id="app">
    <div id="nav">
        <v-btn
        to="/tables"
        color="primary"
        >
        Tables
        </v-btn>
        <v-btn
        to="/login"
        color="purple"
        >
        login

        </v-btn>

      </div>
      <router-view/>
    </div>
</template> -->

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        floating
        permanent
      >
      
        <v-list
          density="compact"
          nav
        >
          <v-list-item prepend-icon="mdi-view-dashboard" title="Table" value="home" to="/tables"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="Login" value="Login" to="/login"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="Register" value="Login" to="/register"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
  <div>
    <router-view/>
  </div>
</template>