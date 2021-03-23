<template>
  <ol
    v-if="!query"
    class="breadcrumb my-4"
  >
    <li class="breadcrumb-item">
      <router-link :to="{name: 'nav-view'}">
        <font-awesome-icon icon="home" />
      </router-link>
    </li>
    <li
      v-for="(folder, index) in folderPath"
      :key="folder.id"
      class="breadcrumb-item"
    >
      <a v-if="index == folderPath.length - 1">{{ folder.label }}</a>
      <router-link v-else :to="{name: 'nav-view-folder', params: {'folderId': folder.id}}">
        {{ folder.label }}
      </router-link>
    </li>
  </ol>
  <ol
    v-else
    class="breadcrumb"
  >
    <li class="breadcrumb-item">
      <router-link :to="{name: 'nav-view'}">
        <font-awesome-icon icon="home" />
      </router-link>
    </li>
    <li
      v-show="query"
      class="breadcrumb-item"
    >
      <span>{{ $t('navigator:search-query-label') }}: <strong>{{ query }}</strong></span>
    </li>
  </ol>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavigatorBreadcrumb',
  computed: {
    ...mapGetters('navigator', [ 'folderPath', 'query' ])
  }
}
</script>

<style scoped>
  .breadcrumb {
    background-color: transparent;
    margin: 0;
    padding: 0;
  }
</style>
