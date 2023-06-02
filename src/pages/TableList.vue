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
                <table class="table table-sm table-hover ">
                  <thead class="thead-light">
                    <tr>
                      <th><b>Id</b></th>
                      <th><b>Họ và tên</b></th>
                      <th><b>Ngày gửi</b></th>
                      <th><b>Trạng thái</b></th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in paginatedItemsTab1" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.hoten }}</td>
                      <td>{{ moment(item.ngaygui).format('DD/MM/yyyy HH:mm:ss') }}</td>
                      <td><span v-if="item.status === 0" style="color: darkgreen;">Đang chờ</span>
                        <span v-if="item.status === 1">Đã hoàn thành</span>
                        <span v-if="item.status === -1" style="color: red;">Đã từ chối</span>
                      </td>

                      <td>
                        <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->
                        <router-link :to="{ path: '/admin/details', query: { id: item.idDangKy } }">
                          <button class="btn btn-sm btn-primary">Xem chi tiết</button>
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </card>
            </div>
          </div>
          <div class="pagination-container">
            <div class="pagination">
              <a @click="previousPageTab1" :disabled="currentPageTab1 === 1">&laquo;</a>
              <a v-for="page in totalPagesTab1" :key="page" :class="{ active: page === currentPageTab1 }"
                @click="goToPageTab1(page)">
                {{ page }}
              </a>
              <a @click="nextPageTab1" :disabled="currentPageTab1 === totalPagesTab1">&raquo;</a>
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
            <table class="table table-sm table-hover">
              <thead class="thead-light">
                <tr>
                  <th></th>
                  <th><b>Id</b></th>
                  <th><b>Họ và tên</b></th>
                  <th><b>Giới tính </b></th>
                  <th><b>Sinh viên trường</b></th>
                  <th><b>SV Năm</b> </th>

                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in paginatedItemsTab2" :key="item.id">
                  <td>
                    <input type="checkbox" v-model="selectedItems" :value="item.id">
                  </td> <!-- Checkbox column -->
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.hoten }}</td>
                  <td>{{ item.gioiTinh }}</td>
                  <td>{{ item.truong.name }}</td>
                  <td>{{ item.namhoc }}</td>

                  <td>
                    <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->

                    <button class="btn btn-sm btn-primary" @click="showXepPhong = true, iSinhVienMoi = item.id">Xếp
                      phòng</button>

                  </td>
                </tr>
              </tbody>
            </table>
          </card>
          <div class="pagination-container">
            <div class="pagination">
              <a @click="previousPageTab2" :disabled="currentPageTab2 === 1">&laquo;</a>
              <a v-for="page in totalPagesTab2" :key="page" :class="{ active: page === currentPageTab2 }"
                @click="goToPageTab2(page)">
                {{ page }}
              </a>
              <a @click="nextPageTab2" :disabled="currentPageTab2 === totalPagesTab2">&raquo;</a>
            </div>
          </div>
        </div>
        <!-- TAB3 -->
        <div v-show="activeTab === 'tab3'" class="tab-pane active">
          <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
            <template slot="header">

              <p class="card-category"></p>
            </template>

            <div class="form-group mr-2 ml-2">
              <select v-model="selectedYC" class="form-control" id="exampleCombobox" style="width: auto;"
                @change="LoaiYCChange()">
                <option value="0">Tất cả</option>
                <option value="1">Gia hạn phòng</option>
                <option value="2">Chuyển phòng</option>
                <option value="3">Hủy phòng</option>
              </select>
            </div>
            <table class="table table-sm table-hover ">
              <thead class="thead-light">
                <tr>
                  <th><b>Id</b></th>
                  <th><b>Họ và tên</b></th>
                  <th><b>Phòng</b></th>
                  <th><b>Ngày gửi</b></th>
                  <th><b>Loại yêu cầu</b></th>
                  <th><b>Trạng thái</b></th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in paginatedItemsTab3" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.tenSinhVien }}</td>
                  <td>{{ item.tenPhong }}</td>
                  <td>{{ moment(item.thoigiangui).format('DD/MM/yyyy ') }}</td>
                  <td>
                    <span v-if="item.loaiYc === 1">Chuyển phòng</span>
                    <span v-if="item.loaiYc === 2">Gia hạn phòng</span>
                    <span v-if="item.loaiYc === 3">Hủy phòng</span>
                  </td>
                  <td>
                    <span v-if="item.status === 0" style="color: darkgreen;">Đang chờ</span>
                    <span v-if="item.status === 1">Đã chấp nhận</span>
                    <span v-if="item.status === -1" style="color: red;">Đã từ chối</span>
                  </td>
                  <td>
                    <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->

                    <button v-if="item.status == 0" class="btn btn-sm btn-primary"
                      @click="showsubform(item.loaiYc, index)">Chi tiết</button>

                  </td>
                </tr>
              </tbody>
            </table>
          </card>
          <div class="pagination-container">
            <div class="pagination">
              <a @click="previousPageTab3" :disabled="currentPageTab3 === 1">&laquo;</a>
              <a v-for="page in totalPagesTab3" :key="page" :class="{ active: page === currentPageTab3 }"
                @click="goToPageTab3(page)">
                {{ page }}
              </a>
              <a @click="nextPageTab3" :disabled="currentPageTab3 === totalPagesTab3">&raquo;</a>
            </div>
          </div>
        </div>

        <!-- Sub form chuyển phòng -->
        <div v-if="showSubform1" class="backdrop">
          <div class="subform">
            <div class="row  ">
              <div class="col-sm-10 ">
                <h5> <b>YÊU CẦU PHÒNG</b> </h5>
              </div>
              <div class="col-sm-2 ">
                <Button variant="outline" color="dark" class="btn btn-sm btn-light"
                  @click="showSubform1 = false, showTuChoi = false">
                  Đóng</Button>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
                <p>Người gửi:</p>
                <p>Phòng hiện tại:</p>
                <p>Loại yêu cầu:</p>
                <p>Phòng chuyển đến:</p>
              </div>
              <div class="col-sm-7">
                <p><b>{{ dataSubform.tenSinhVien }}</b></p>
                <p><b>{{ dataSubform.tenPhong }}</b></p>
                <p><b>Chuyển phòng </b></p>
                <p><b>{{ dataSubform.tenPhongMoi }}</b></p>
              </div>
            </div>
            <div class="col-sm-10 mt-2">
              <input v-model="lydo" type="text" placeholder="lý do từ chối" class="form-control" v-if="showTuChoi"
                required />
            </div>
            <div class="row pt-5">
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-danger" @click="ChangeStatus(dataSubform.idYC, -1, dataSubform.loaiYc)">Từ
                  chối</button>
              </div>
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-primary"
                  @click="ChangeStatus(dataSubform.idYC, 1, dataSubform.loaiYc), showSubform1 = false">Chấp
                  nhận</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sub form gia hạn phòng -->
        <div v-if="showSubform2" class="backdrop">
          <div class="subform">
            <div class="row  ">
              <div class="col-sm-10 ">
                <h5> <b>YÊU CẦU PHÒNG</b> </h5>
              </div>
              <div class="col-sm-2 ">
                <Button variant="outline" color="dark" class="btn btn-sm btn-light"
                  @click="showSubform2 = false, showTuChoi = false">
                  Đóng</Button>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
                <p>Người gửi:</p>
                <p>Phòng:</p>
                <p>Loại yêu cầu:</p>
                <p>Thời giạn gia hạn:</p>
              </div>
              <div class="col-sm-7">
                <p><b>{{ dataSubform.tenSinhVien }}</b></p>
                <p><b>{{ dataSubform.tenPhong }}</b></p>
                <p><b>Gia hạn phòng</b></p>
                <p><b>{{ dataSubform.thoiGianGiaHan }}</b></p>
              </div>
            </div>
            <div class="col-sm-10 mt-2">
              <input v-model="lydo" type="text" placeholder="lý do từ chối" class="form-control" v-if="showTuChoi"
                required />
            </div>

            <div class="row pt-5">
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-danger " @click="ChangeStatus(dataSubform.idYC, -1, dataSubform.loaiYc)">Từ
                  chối</button>
              </div>
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-primary"
                  @click="ChangeStatus(dataSubform.idYC, 1, dataSubform.loaiYc), showSubform2 = false">Chấp
                  nhận</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sub form hủy phòng -->
        <div v-if="showSubform3" class="backdrop">
          <div class="subform">
            <div class="row  ">
              <div class="col-sm-10 ">
                <h5> <b>YÊU CẦU PHÒNG</b> </h5>
              </div>
              <div class="col-sm-2 ">
                <Button variant="outline" color="dark" class="btn btn-sm btn-light"
                  @click="showSubform3 = false, showTuChoi = false">
                  Đóng</Button>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
                <p>Người gửi:</p>
                <p>Phòng:</p>
                <p>Loại yêu cầu:</p>
                <p>Thời gian hủy:</p>
              </div>
              <div class="col-sm-7">
                <p><b>{{ dataSubform.tenSinhVien }}</b></p>
                <p><b>{{ dataSubform.tenPhong }}</b></p>
                <p><b> Hủy phòng</b></p>
                <p><b>{{ dataSubform.thoiGianHuy }}</b></p>
              </div>
            </div>
            <div class="col-sm-10 mt-2">
              <input v-model="lydo" type="text" placeholder="lý do từ chối" class="form-control" v-if="showTuChoi"
                required />
            </div>
            <div class="row pt-5">
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-danger" @click="ChangeStatus(dataSubform.idYC, -1, dataSubform.loaiYc)">Từ
                  chối</button>
              </div>
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-primary"
                  @click="ChangeStatus(dataSubform.idYC, 1, dataSubform.loaiYc), showSubform3 = false">Chấp
                  nhận</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Sub form xếp phòng cho sinh viên -->
        <div v-if="showXepPhong" class="backdrop">
          <div class="subform">
            <div class="row  ">
              <div class="col-sm-10 ">
                <h5> <b>XẾP PHÒNG CHO SINH VIÊN</b> </h5>
              </div>
              <div class="col-sm-2 ">
                <Button variant="outline" color="dark" class="btn btn-sm btn-light" @click="showXepPhong = false">
                  Đóng</Button>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
                <p>Họ tên sinh viên:</p>
                <p>Khu:</p>
                &nbsp;
                <p>Phòng còn trống:</p>
              </div>
              <div class="col-sm-7">
                <p><b>Nguyễn Hoàng Việt</b></p>
                <p>
                  <select v-model="selectedOptionKhu" class="form-control" style="width: auto;" @change="getRoom">
                    <option v-for="option in optionsKhu" :value="option.idKhu" :key="option.value">{{ option.tenKhu }}
                    </option>
                  </select>
                </p>
                <p><select v-model="selectedOptionPhong" class="form-control" style="width: auto;">
                    <option v-for="option in optionsPhong" :value="option.idPhong" :key="option.value">{{ option.tenphong
                    }}
                      <p>( Còn trống: {{ option.conTrong }})</p>
                    </option>
                  </select></p>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column pb-2">
                <button class="btn btn-sm btn-primary" @click="SetRoom(), showXepPhong = false">Xác nhận</button>
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
import moment from 'moment';

export default {
  components: {
    Card
  },
  computed: {
    paginatedItemsTab1() {
      const startIndex = (this.currentPageTab1 - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.donDangKy.slice(startIndex, endIndex);
    },
    totalPagesTab1() {
      return Math.ceil(this.donDangKy.length / this.itemsPerPage);
    },

    paginatedItemsTab2() {
      const startIndex = (this.currentPageTab2 - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.SvNoRoom.slice(startIndex, endIndex);
    },
    totalPagesTab2() {
      return Math.ceil(this.SvNoRoom.length / this.itemsPerPage);
    },

    paginatedItemsTab3() {
      const startIndex = (this.currentPageTab3 - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.yeuCauPhong.slice(startIndex, endIndex);
    },
    totalPagesTab3() {
      return Math.ceil(this.yeuCauPhong.length / this.itemsPerPage);
    },
   
  },
  data() {
    return {
      selectedItems: [],
      moment: moment,
      SvNoRoom: [],
      showDetails: false,
      activeTab: 'tab1',
      showSubform1: false,
      showSubform2: false,
      showSubform3: false,
      showXepPhong: false,
      showTuChoi: false,
      lydo: "",
      donDangKy: [],
      yeuCauPhong: [],
      dataSubform: [],
      i: 0,
      iSinhVienMoi: 0,
      optionsKhu: [],
      selectedOptionKhu: '',
      optionsPhong: [],
      selectedOptionPhong: '',
      currentPageTab1: 1, // The current page number
      currentPageTab2: 1,
      currentPageTab3: 1,
      itemsPerPage: 10, // The number of items to display per page
      selectedYC: 1
    }
  },
  methods: {
    showsubform(loaiyc, index) {
      if (loaiyc == 1) {
        // chuyển phòng
        this.i = index
        this.showSubform1 = true
        this.dataSubform = this.yeuCauPhong[index]
      }
      else if (loaiyc == 2) {
        this.i = index
        this.showSubform2 = true
        this.dataSubform = this.yeuCauPhong[index]
      }
      else if (loaiyc == 3) {
        this.i = index
        this.showSubform3 = true
        this.dataSubform = this.yeuCauPhong[index]
      }
    },
    // update status of ycphong
    ChangeStatus2(idYc, newstatus, loaiYc) {
      axios.put(`https://localhost:7252/api/YeuCauPhongs/` + idYc + `/status/` + newstatus)
        .then(response => {
          // chấp nhận
          if (newstatus == 1) {
            this.ActionPhong(loaiYc)
            this.$notify({
              title: 'Thông báo',
              text: 'Đã phê duyệt!',
              type: 'success'
            })
            this.getData()
            // từ chối
          } else if (newstatus == -1) {
            this.showTuChoi = true
            // this.$notify({
            //   title: 'Thông báo',
            //   text: 'Đã từ chối!',
            //   type: 'danger'
            // })
            //this.getData()
          }
        })
        .catch(error => {
          console.log(error)
        });

    },
    ChangeStatus(idYc, newstatus, loaiYc) {
      if (newstatus == 1) {
        axios.put(`https://localhost:7252/api/YeuCauPhongs/` + idYc + `/chapnhan/` + newstatus)
          .then(respone => {
            this.ActionPhong(loaiYc)
            this.$notify({
              title: 'Thông báo',
              text: 'Đã phê duyệt!',
              type: 'success'
            })
            this.getData()
          }).catch(error => {
            console.log(error)
          })
      } else if (newstatus == -1) {
        this.showTuChoi = true
        if (this.lydo != "") {
          axios.put(`https://localhost:7252/api/YeuCauPhongs/` + idYc + `/tuchoi/` + newstatus + '/' + this.lydo)
            .then(respone => {
              this.$notify({
                title: 'Thông báo',
                text: 'Đã từ chối!',
                type: 'danger'
              })
              this.lydo == ""
              this.showTuChoi = false
              this.showSubform1 = false
              this.showSubform2 = false
              this.showSubform3 = false
              this.getData()
            }).catch(error => {
              console.log(error)
            })
        }

      }

    },
    ActionPhong(loaiyc) { // nếu chấp nhận
      // xử lý tình trạng phòng cho sinh viên
      //1. thay đổi phòng nếu yc chuyển phòng của sv được chấp nhận
      if (loaiyc == 1) {
        axios.put(`https://localhost:7252/api/SinhViens/${this.yeuCauPhong[this.i].idSinhVien}/editroom2/` + this.yeuCauPhong[this.i].idNewRoom)
          .then(response => {
            console.log(this.yeuCauPhong[this.i].idNewRoom)
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          });
      } else if (loaiyc == 2) {
        const { idSinhVien: sinhVienId, kiGiaHanId: kiId, phongId } = this.yeuCauPhong[this.i];
        const newHopDong = { sinhVienId, kiId, phongId }
        console.log(newHopDong)
        //2. tạo hóa đơn mới nếu phe duyệt yêu cầu gia hạn phòng
        axios.post(`https://localhost:7252/api/HopDongThuePhongs`, newHopDong)
          .then(response => {
            console.log(this.yeuCauPhong[this.i].idNewRoom)
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          });

      } else if (loaiyc == 3) {
        //3. Thay đổi tình trạng tài khoản của sinh viên nếu yêu cầu hủy phòng dược chấp nhận  - xóa idphong khỏi sv
        //(tạo table mới svhuyphong để hoàn trả tiền phòng cho sv) 
        axios.put(`https://localhost:7252/api/SinhViens/${this.yeuCauPhong[this.i].idSinhVien}/editroom`, { NewRoom: null, status: 0 })
          .then(response => {
            this.$notify({
              title: 'Thông báo',
              text: 'Hủy phòng thành công!',
              type: 'success'
            })
          })
          .catch(error => {
            console.log(error)
          });
      }
    },
    getData() {
      axios.get('https://localhost:7252/api/DonDangKies')
        .then(response => {
          this.donDangKy = response.data;
        })
        .catch(error => {
          console.log(error);
        });
      axios.get('https://localhost:7252/api/YeuCauPhongs')
        .then(response => {
          this.yeuCauPhong = response.data;
          console.log(this.yeuCauPhong)
        })
        .catch(error => {
          console.log(error);
        });
      axios.get('https://localhost:7252/api/YeuCauPhongs/svnoroom')
        .then(response => {
          this.SvNoRoom = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
      axios.get('https://localhost:7252/api/Khus')
        .then(response => {
          this.optionsKhu = response.data
          console.log(this.optionsKhu)
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRoom() {
      if (this.selectedOptionKhu) {
        axios.get('https://localhost:7252/api/Phongs/avai_room/' + this.selectedOptionKhu)
          .then(response => {

            this.optionsPhong = response.data
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    SetRoom() {
      console.log(this.selectedOptionPhong)
      axios.put(`https://localhost:7252/api/SinhViens/${this.iSinhVienMoi}/editroom2/` + this.selectedOptionPhong)
        .then(response => {
          this.$notify({
            title: 'Thông báo',
            text: 'Xếp phòng thành công!',
            type: 'success'
          })
          this.getData()
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        });
    },
    //tab1
    previousPageTab1() {
      if (this.currentPageTab1 > 1) {
        this.currentPageTab1--;
      }
    },
    nextPageTab1() {
      if (this.currentPageTab1 < this.totalPagesTab1) {
        this.currentPageTab1++;
      }
    },
    goToPageTab1(page) {
      this.currentPageTab1 = page;
    },
    //tab2
    previousPageTab2() {
      if (this.currentPageTab2 > 1) {
        this.currentPageTab2--;
      }
    },
    nextPageTab2() {
      if (this.currentPageTab2 < this.totalPagesTab2) {
        this.currentPageTab2++;
      }
    },
    goToPageTab2(page) {
      this.currentPageTab2 = page;
    },
    //tab3
    previousPageTab3() {
      if (this.currentPageTab3 > 1) {
        this.currentPageTab3--;
      }
    },
    nextPageTab3() {
      if (this.currentPageTab3 < this.totalPagesTab3) {
        this.currentPageTab3++;
      }
    },
    goToPageTab3(page) {
      this.currentPageTab3 = page;
    },
    LoaiYCChange() {
     
    },

  },
  mounted() {
    this.getData()

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
  height: auto;
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
}</style>

