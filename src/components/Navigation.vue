<template>
  <div >
    <ul class="navigation">
      <li><router-link to="/">首頁</router-link></li>
      <li><router-link to="/about">關於我們</router-link></li>
      <li>
        <input v-model.trim="search" placeholder="關鍵字查詢" class=" form-control navigation-search">
      </li>
    </ul>
    <router-view class="routerView"></router-view>
  </div>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline;
  margin-right: 10px;
}

a {
  text-decoration: none;
  color: #333;
}

a:hover {
  color: #4267b2; /* Facebook 的主要藍色 */
}
</style>
