<template>
  <div class="content">
    <div class="container-fluid">
      <div class="tab-pane active">
        <div class="row">
          <div class="col-12">
            <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
              <template slot="header">
                <h4 class="card-title">DANH SÁCH SINH VIÊN </h4>
                <p class="card-category"></p>
              </template>
              <table class="table table-sm table-hover  table-bordered">
                <thead>
                  <tr class="thead-light">
                    <th><b>STT</b></th>
                    <th><b>Họ và tên</b></th>
                    <th><b>Trường</b></th>
                    <th><b>Sinh viên năm</b></th>
                    <th><b>Trạng thái</b></th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in paginatedItems" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.sv.hoten }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.sv.namhoc }}</td>
                    <td><span v-if="item.sv.status === 1" style="color: darkgreen;">Bình thường</span>
                      <span v-if="item.sv.status === -1" style="color: brown;">Khóa</span>
                        <span v-if="item.sv.status === 0" style="color: darkgreen;">Bình thường</span>
                    </td>

                    <td>
                      <router-link :to="{ path: '/admin/std-profile', query: { id: item.sv.id } }">
                        <button class="btn btn-sm btn-primary">Xem chi tiết</button>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </card>
          </div>
        </div>
      </div>




      <div class="pagination-container">
            <div class="pagination">
                <a @click="previousPage" :disabled="currentPage === 1">&laquo;</a>
                <a v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="goToPage(page)">
                    {{ page }}
                </a>
                <a @click="nextPage" :disabled="currentPage === totalPages">&raquo;</a>
            </div>
        </div>

    </div>
  </div>
</template>
<script>
import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
import axios from 'axios';
import moment from 'moment';


export default {
  components: {
    Card,

  },
  computed: {
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.SinhViens.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.SinhViens.length / this.itemsPerPage);
    },
  },
  data() {
    return {
      moment: moment,
      SinhViens: [],
      currentPage: 1, // The current page number
      itemsPerPage: 10, // The number of items to display per page
    }
  },
  methods: {
    viewItem(item) {
      console.log('View item:', item)
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    axios.get('https://localhost:7252/api/SinhViens')
      .then(response => {
        this.SinhViens = response.data;

      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>


