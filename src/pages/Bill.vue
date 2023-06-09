
<template>
    <div>
        <h3> Thông tin sinh viên</h3>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'tab1' }" @click="activeTab = 'tab1'" href="#">HÓA ĐƠN
                    NỘI TRÚ</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'tab2' }" @click="activeTab = 'tab2'" href="#">HÓA ĐƠN
                    ĐIỆN NƯỚC</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'tab3' }" @click="activeTab = 'tab3'" href="#">DANH SÁCH
                    HOÀN TRẢ PHÍ</a>
            </li>
        </ul>
        <div class="tab-content">
            <div v-show="activeTab === 'tab1'" class="tab-pane active">
                <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
                    <template slot="header">
                        <div class="row">

                            <div class="form-group mr-2">
                                <select class="form-control" id="exampleCombobox" style="width: auto;">
                                    <option>Kì 1/2023</option>
                                    <option>Kì 2/2022</option>
                                    <option>Kì 1/2022</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="exampleCombobox" style="width: auto;">
                                    <option>Đã đóng</option>
                                    <option>Chưa đóng</option>
                                </select>
                            </div>
                        </div>
                        <p class="card-category"></p>
                    </template>
                    <table class="table table-sm table-hover ">
                        <thead class="thead-light">
                            <tr>
                                <th><b>Id</b></th>
                                <th><b>Họ và tên</b></th>
                                <th><b>Phòng</b></th>
                                <th><b>Kì</b></th>
                                <th><b>Tổng tiền</b></th>
                                <th><b>Trạng thái</b></th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in paginatedItemsThuePhong" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.hoten }}</td>
                                <td>{{ item.tenphong }}</td>
                                <td>{{ item.ki }}</td>
                                <td>{{ item.tongtien.toLocaleString("vi-VN", { style: "currency", currency: "VND", }) }}
                                </td>
                                <td>
                                    <span v-if="item.status == 0" style="color: brown;"> Chưa đóng</span>
                                    <span v-if="item.status == 1" style="color:darkgreen ;"> Đã đóng</span>

                                </td>
                                <td>
                                    <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->

                                    <button class="btn btn-sm btn-primary">Xem chi tiết</button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </card>
                <!-- phân trang thuê phòng -->
                <div class="pagination-container">
                    <div class="pagination">
                        <a @click="previousPageThuePhong" :disabled="currentPageThuePhong === 1">&laquo;</a>
                        <a v-for="page in totalPagesThuePhong" :key="page"
                            :class="{ active: page === currentPageThuePhong }" @click="goToPageThuePhong(page)">
                            {{ page }}
                        </a>
                        <a @click="nextPageThuePhong" :disabled="currentPageThuePhong === totalPagesThuePhong">&raquo;</a>
                    </div>
                </div>
            </div>
            <div v-show="activeTab === 'tab2'" class="tab-pane active">
                <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
                    <template slot="header">
                        <div class="row">

                        </div>
                        <div class="row">
                            <div class="col-sm-10">
                                <div class="form-group">
                                    <select class="form-control" id="exampleCombobox" style="width: auto;">
                                        <option>Đã đóng</option>
                                        <option>Chưa đóng</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-2">

                                <button class="btn btn-primary pr-2" @click="showSubform = true">Upload hóa đơn</button>
                                <!-- <input type="file" id="myFile" name="filename"> -->
                                <!-- <input type="submit"> -->
                            </div>
                        </div>
                        <p class="card-category"></p>
                    </template>
                    <table class="table table-sm table-hover ">
                        <thead class="thead-light">
                            <tr>
                                <th><b>Id</b></th>
                                <th><b>Tên phòng</b></th>
                                <th><b>Từ ngày</b></th>
                                <th><b>Đến ngày</b></th>
                                <th><b>CS điện cũ</b></th>
                                <th><b>CS điện mới</b></th>
                                <th><b>Giá điện(kWh)</b></th>
                                <th><b>CS nước cũ</b></th>
                                <th><b>CS nước mới</b></th>
                                <th><b>Giá nước(m3)</b></th>
                                <th><b>Tổng tiền</b></th>
                                <th><b>Tình trạng</b></th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in paginatedItemsDienNuoc" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.tenPhong }}</td>
                                <td>{{ moment(item.hoaDonTienDienNuoc.startDate).format('DD/MM/yyyy ') }}</td>
                                <td>{{ moment(item.hoaDonTienDienNuoc.endDate).format('DD/MM/yyyy ') }}</td>
                                <td>{{ item.hoaDonTienDienNuoc.csDien1 }}</td>
                                <td>{{ item.hoaDonTienDienNuoc.csDien2 }}</td>
                                <td>{{ item.hoaDonTienDienNuoc.giadien }}</td>
                                <td>{{ item.hoaDonTienDienNuoc.csNuoc1 }}</td>
                                <td>{{ item.hoaDonTienDienNuoc.csNuoc2 }}</td>
                                <td>{{ item.hoaDonTienDienNuoc.gianuoc }}</td>
                                <td>{{ item.hoaDonTienDienNuoc.tongTien }}</td>
                                <td>
                                    <span v-if="item.hoaDonTienDienNuoc.status == 0">Chưa đóng</span>
                                    <span v-if="item.hoaDonTienDienNuoc.status == 1">Đã đóng</span>
                                </td>
                                <td>
                                    <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->
                                    <router-link to="/admin/details">
                                        <button class="btn btn-sm btn-primary">Chỉnh sửa</button>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </card>
                <!-- phân trang tab điện nước -->
                <div class="pagination-container">
                    <div class="pagination">
                        <a @click="previousPageDienNuoc" :disabled="currentPageDienNuoc === 1">&laquo;</a>
                        <a v-for="page in totalPagesDienNuoc" :key="page" :class="{ active: page === currentPageDienNuoc }"
                            @click="goToPageDienNuoc(page)">
                            {{ page }}
                        </a>
                        <a @click="nextPageDienNuoc" :disabled="currentPageDienNuoc === totalPagesDienNuoc">&raquo;</a>
                    </div>
                </div>
            </div>
            <div v-show="activeTab === 'tab3'" class="tab-pane active">
                <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
                    <template slot="header">
                        <div class="row">
                        </div>
                        <p class="card-category"></p>
                    </template>
                    <table class="table table-sm table-hover ">
                        <thead class="thead-light">
                            <tr>
                                <th><b>STT</b></th>
                                <th><b>Họ và tên</b></th>
                                <th><b>Phòng</b></th>
                                <th><b>Kì</b></th>
                                <th><b>Tổng tiền</b></th>
                                <th><b>Trạng thái</b></th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in dataHoanTraPhi" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.hoten }}</td>
                                <td>{{ item.tenphong }}</td>
                                <td>{{ item.ki }}</td>
                                <td>{{ item.tienCoc.toLocaleString("vi-VN", { style: "currency", currency: "VND", }) }}
                                </td>
                                <td>
                                    <span v-if="item.status == 0" style="color: brown;">Chưa hoàn trả</span>
                                    <span v-if="item.status == 1" style="color:darkgreen ;">Đã hoàn trả</span>

                                </td>
                                <td>
                                    <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->

                                    <button class="btn btn-sm btn-primary">Xem chi tiết</button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </card>
                <!-- phân trang thuê phòng -->
                <!-- <div class="pagination-container">
                    <div class="pagination">
                        <a @click="previousPageThuePhong" :disabled="currentPageThuePhong === 1">&laquo;</a>
                        <a v-for="page in totalPagesThuePhong" :key="page"
                            :class="{ active: page === currentPageThuePhong }" @click="goToPageThuePhong(page)">
                            {{ page }}
                        </a>
                        <a @click="nextPageThuePhong" :disabled="currentPageThuePhong === totalPagesThuePhong">&raquo;</a>
                    </div>
                </div> -->
            </div>
            <!-- // upoload hóa đơn -->
            <div v-if="showSubform" class="backdrop">
                <div class="subform">
                    <div class="row  ">
                        <div class="col-sm-10 ">
                            <h5> <b>UPLOAD HÓA ĐƠN TIỀN ĐIỆN</b> </h5>
                        </div>
                        <div class="col-sm-2 ">
                            <Button variant="outline" color="dark" class="btn btn-sm btn-light"
                                @click="showSubform = false">
                                Đóng</Button>
                        </div>
                    </div>

                    <div class="row pt-5">
                        <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                            <form action="/action_page.php">
                                <input type="file" ref="fileInput" @change="handleFileChange">

                            </form>
                            <button class="btn btn-sm btn-light mt-5" @click="uploadFile(), showSubform = false">XÁC
                                NHẬN</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
import moment from 'moment';
export default {
    computed: {
        paginatedItemsDienNuoc() {
            const startIndex = (this.currentPageDienNuoc - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.dataDienNuoc.slice(startIndex, endIndex);
        },
        totalPagesDienNuoc() {
            return Math.ceil(this.dataDienNuoc.length / this.itemsPerPage);
        },
        paginatedItemsThuePhong() {
            const startIndex = (this.currentPageThuePhong - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.dataThuePhong.slice(startIndex, endIndex);
        },
        totalPagesThuePhong() {
            return Math.ceil(this.dataThuePhong.length / this.itemsPerPage);
        },
    },
    data() {
        return {
            moment,
            activeTab: 'tab1',
            showDetails: false,
            dataDienNuoc: [],
            dataThuePhong: [],
            dataHoanTraPhi : [],
            showSubform: false,
            dataSubform: [],
            currentPageThuePhong: 1, // The current page number
            currentPageDienNuoc: 1, // The current page number
            itemsPerPage: 10, // The number of items to display per page
        }
    },
    methods: {
        getData() {
            axios.get("https://localhost:7252/api/HoaDonTienDienNuocs").
                then(respone => {
                    this.dataDienNuoc = respone.data
                    console.log(this.dataDienNuoc)
                })
                .catch(error => {
                    console.log(error)
                });

            axios.get("https://localhost:7252/api/HopDongThuePhongs").
                then(respone => {
                    this.dataThuePhong = respone.data
                    console.log(this.dataThuePhong)
                })
                .catch(error => {
                    console.log(error)
                });
            axios.get("https://localhost:7252/api/HopDongThuePhongs/HoanTraPhi").
                then(respone => {
                    this.dataHoanTraPhi = respone.data
                    console.log(this.dataThuePhong)
                })
                .catch(error => {
                    console.log(error)
                });
        },
        handleFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        async uploadFile() {
            if (!this.selectedFile) {
                // No file selected, handle the error
                return;
            }
            try {
                const formData = new FormData();
                formData.append('file', this.selectedFile);

                const response = await fetch('https://localhost:7252/api/HoaDonTienDienNuocs/addhoadon', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.$notify({
                        title: 'Thông báo',
                        text: 'Thêm hóa đơn tiền diện thành công!',
                        type: 'success'
                    })
                    this.getData()
                    console.log(response.data)
                } else {
                    console.log(respone.error)
                }
            } catch (error) {
                // Error occurred during file upload, handle the error
            }
        },
        previousPageThuePhong() {
            if (this.currentPageThuePhong > 1) {
                this.currentPageThuePhong--;
            }
        },
        nextPageThuePhong() {
            if (this.currentPageThuePhong < this.totalPagesThuePhong) {
                this.currentPageThuePhong++;
            }
        },
        goToPageThuePhong(page) {
            this.currentPageThuePhong = page;
        },

        previousPageDienNuoc() {
            if (this.currentPageDienNuoc > 1) {
                this.currentPageDienNuoc--;
            }
        },
        nextPageDienNuoc() {
            if (this.currentPageDienNuoc < this.totalPagesDienNuoc) {
                this.currentPageDienNuoc++;
            }
        },
        goToPageDienNuoc(page) {
            this.currentPageDienNuoc = page;
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
}
</style>