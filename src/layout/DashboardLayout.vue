<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/admin/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>TRANG CHỦ</p>
      </sidebar-link>
      <sidebar-link to="/admin/notifications">
        <i class="nc-icon nc-bell-55"></i>
        <p>Thông báo</p>
      </sidebar-link>
      <sidebar-link to="/admin/user">
        <i class="nc-icon nc-circle-09"></i>
        <p>Tài khoản</p>
      </sidebar-link>
      <sidebar-link to="/admin/table-list">
        <i class="nc-icon nc-notes"></i>
        <p>Yêu cầu của sinh viên</p>
      </sidebar-link>
      <sidebar-link to="/admin/room">
        <i class="nc-icon nc-grid-45"></i>
        <p>quản lý phòng</p>
      </sidebar-link>
      <sidebar-link to="/admin/bills">
        <i class="nc-icon nc-single-copy-04"></i>
        <p>quản lý hóa đơn</p>
      </sidebar-link>
      <sidebar-link to="/admin/list-sv">
        <i class="nc-icon nc-badge"></i>
        <p>Tài khoản Sinh viên</p>
      </sidebar-link>
      <!-- <sidebar-link to="/admin/thongke">
        <i class="nc-icon nc-chart-bar-32"></i>
        <p>Thống kê</p>
      </sidebar-link> -->

      <!-- <template slot="bottom-links">
        <sidebar-link class="active"
                      to="/admin/upgrade">
          <i class="nc-icon nc-alien-33"></i>
          <p>Upgrade to PRO</p>
        </sidebar-link>
      </template> -->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
