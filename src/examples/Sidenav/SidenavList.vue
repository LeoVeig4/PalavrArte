<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item" v-for="item in users_list">
        <sidenav-item :url="item.url" :class="getRoute() === 'dashboard-default' ? 'active' : ''" :navText="item.navText">
          <template v-slot:icon>
            <i :class="item.icon"></i>
          </template>
        </sidenav-item>
      </li>



    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";
import UsersItens from "./UsersItens.json"
export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
      users_list: UsersItens,
    };
  },
  components: {
    SidenavItem,
    SidenavCard,
  },
  beforeMount() {
    this.users_list = this.users_list[`${this.$store.state.auth.role}_list`]
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
};
</script>
