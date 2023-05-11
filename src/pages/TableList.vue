<template>
  <div class="content">
    <div class="container-fluid">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'tab1' }" @click="activeTab = 'tab1'" href="#"> ĐĂNG KÍ
            MỚI</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'tab2' }" @click="activeTab = 'tab2'" href="#"> XẾP PHÒNG
            CHO SV MỚI</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'tab3' }" @click="activeTab = 'tab3'" href="#">HỦY/GIA HẠN/
            CHUYỂN PHÒNG</a>
        </li>

      </ul>
      <div class="tab-content">
        <!-- TAB1 -->
        <div v-show="activeTab === 'tab1'" class="tab-pane active">
          <div class="row">
            <div class="col-12">
              <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
                <template slot="header">
                  <h4 class="card-title">DANH SÁCH SINH VIÊN ĐĂNG KÝ MỚI</h4>
                  <p class="card-category"></p>
                </template>
                <table class="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Họ và tên</th>
                      <th>Ngày gửi</th>
                      <th>Trạng thái</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in donDangKy" :key="item.id">
                      <td>{{ item.idDangKy }}</td>
                      <td>{{ item.hoten }}</td>
                      <td>{{ item.ngayGui }}</td>
                      <td><span v-if="item.status === 0">đang chờ</span>
                        <span v-else>đã hoàn thành</span>
                      </td>

                      <td>
                        <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->
                       <router-link :to="{path: '/admin/details', query: { id: item.idDangKy}}">
                          <button class="btn btn-primary">Xem chi tiết</button>
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </card>
            </div>
          </div>
        </div>
        <!-- TAB2 -->
        <div v-show="activeTab === 'tab2'" class="tab-pane active">
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
            <template slot="header">
              <h4>DANH SÁCH SINH VIÊN MỚI</h4>
              <p class="card-category"></p>
            </template>
            <table class="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Họ và tên</th>
                  <th>Ngày duyệt</th>
                  <th>Sinh viên trường</th>
                  <th>SV Năm </th>

                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tableData3" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.hovaten }}</td>
                  <td>{{ item.ngayduyet }}</td>
                  <td>{{ item.truong }}</td>
                  <td>{{ item.svnam }}</td>
                  <td>
                    <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->

                    <button class="btn btn-primary" @click="showSubform1 = true">Xếp phòng</button>

                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>
        <!-- TAB3 -->
        <div v-show="activeTab === 'tab3'" class="tab-pane active">
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
            <template slot="header">

              <p class="card-category"></p>
            </template>
            <table class="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Họ và tên</th>
                  <th>Phòng</th>
                  <th>Ngày gửi</th>
                  <th>Loại yêu cầu</th>
                  <th>Trạng thái</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tableData2" :key="item.id">
                  <td>{{ item.id }}</td>
                  <td>{{ item.hovaten }}</td>
                  <td>{{ item.phong }}</td>
                  <td>{{ item.ngaygui }}</td>
                  <td>{{ item.loaiyeucau }}</td>
                  <td>{{ item.trangthai }}</td>
                  <td>
                    <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->

                    <button class="btn btn-primary" @click="showSubform1 = true">Chi tiết</button>

                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>

        <!-- Sub form gia hạn phòng -->
        <div v-if="showSubform1" class="backdrop">
          <div class="subform">
            <div class="row  ">
              <div class="col-sm-10 ">
                <h5> <b>YÊU CẦU PHÒNG</b> </h5>
              </div>
              <div class="col-sm-2 ">
                <Button variant="outline" color="dark" class="btn btn-sm btn-light" @click="showSubform1 = false">
                  Đóng</Button>
              </div>
            </div>
            <div class="row">

              <div class="col-sm-5">
                <p>Người gửi:</p>
                <p>Phòng:</p>
                <p>Loại yêu cầu:</p>
                <p>Phòng chuyển đến:</p>
              </div>
              <div class="col-sm-7">
                <p><b>Nguyễn Hoàng Việt</b></p>
                <p><b>A216</b></p>
                <p><b>Chuyển phòng</b></p>
                <p><b>A217</b></p>
              </div>
            </div>
            <div class="row pt-5">

              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-danger ">Từ chối</button>
              </div>
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-primary">Chấp nhận</button>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
import axios from 'axios';
const tableData = [
  {
    id: 1,
    hovaten: 'Nguyễn Văn A',
    ngaygui: '26/02/2001',
    trangthai: 'Đang chờ'
  }

]
const tableData2 = [
  {
    id: 1,
    hovaten: 'Nguyễn Hoàng Việt',
    phong: 'A216',
    ngaygui: '22/04/2023',
    loaiyeucau: 'Chuyển phòng',
    trangthai: 'Đang chờ'
  },
  {
    id: 2,
    hovaten: 'Nguyễn Hoàng Nam',
    phong: 'A216',
    ngaygui: '22/04/2023',
    loaiyeucau: 'Gia hạn phòng',
    trangthai: 'Đang chờ'
  },
  {
    id: 3,
    hovaten: 'Nguyễn Hoàng Huy',
    phong: 'A216',
    ngaygui: '22/04/2023',
    loaiyeucau: 'Hủy phòng',
    trangthai: 'Đang chờ'
  },
  {
    id: 4,
    hovaten: 'Nguyễn Hoàng Việt',
    phong: 'A216',
    ngaygui: '22/04/2023',
    loaiyeucau: 'Chuyển phòng',
    trangthai: 'Đang chờ'
  },
  {
    id: 5,
    hovaten: 'Nguyễn Hoàng Việt',
    phong: 'A216',
    ngaygui: '22/04/2023',
    loaiyeucau: 'Chuyển phòng',
    trangthai: 'Đang chờ'
  }
]
const tableData3 = [
  {
    id: 1,
    hovaten: 'Nguyễn Hoàng Việt',
    phong: 'A216',
    ngayduyet: '22/04/2023',
    truong: 'ĐH Sư Phạm Kỹ Thuật Đà Nẵng',
    svnam: '1'
  },
  {
    id: 2,
    hovaten: 'Nguyễn Hoàng Nam',
    phong: 'A216',
    ngayduyet: '22/04/2023',
    truong: 'ĐH Sư Phạm Kỹ Thuật Đà Nẵng',
    svnam: '3'
  },
  {
    id: 3,
    hovaten: 'Nguyễn Hoàng ',
    phong: 'A216',
    ngayduyet: '22/04/2023',
    truong: 'ĐH Sư Phạm Kỹ Thuật Đà Nẵng',
    svnam: '2'
  },
  {
    id: 4,
    hovaten: 'Nguyễn Hoàng ',
    phong: 'A216',
    ngayduyet: '22/04/2023',
    truong: 'ĐH Sư Phạm Kỹ Thuật Đà Nẵng',
    svnam: '2'
  },
  {
    id: 5,
    hovaten: 'Nguyễn Hoàng ',
    phong: 'A216',
    ngayduyet: '22/04/2023',
    truong: 'ĐH Sư Phạm Kỹ Thuật Đà Nẵng',
    svnam: '2'
  },

]
export default {
  components: {
    Card
  },
  data() {
    return {
      tableData2,
      tableData,
      tableData3,
      showDetails: false,
      activeTab: 'tab1',
      showSubform1: false,
      donDangKy: []
    }
  },
  methods: {
    viewItem(item) {
      console.log('View item:', item)
    },

  },
  created() {
    axios.get('https://localhost:7252/api/DonDangKies')
      .then(response => {
        this.donDangKy = response.data;
        console.log(this.donDangKy);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
<style>
.subform {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background-color: white;
  width: 450px;
  height: 300px;
  padding: 5px;
  border-radius: 10px;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}
</style>

