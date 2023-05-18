<template>
    <section>
        <h2><b>Chi tiết yêu cầu</b></h2>
        <div class="container">
            <div class=" row d-flex justify-content-end">
                <button class="btn btn-primary m-2" @click="ChangeStatus()">Phê duyệt</button>
                <button class="btn btn-warning m-2" @click="TuChoi()">Từ chối</button>
            </div>

            <div class="row ">
                <!-- khối thông tin sinh viên bên trái -->
                <div class="col-lg-7 mx-0 d-flex justify-content-center flex-column border ">
                    <h4>THÔNG TIN SINH VIÊN</h4>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p>Họ và tên: <b>{{ this.donDangKy.hoten }}</b></p>
                                <p>Sinh viên trường: <b>{{ donDangKy.truongId }}</b></p>
                                <p>Sinh viên năm: <b>{{ donDangKy.namhoc }}</b></p>
                                <p>Số CCCD: <b>{{ donDangKy.cccd }}</b></p>
                                <p>Ngày cấp CCCD: <b>{{ moment(donDangKy.ngaygui).format('DD/MM/yyyy') }}</b></p>
                                <p>Nơi cấp CCCD: <b>{{ donDangKy.noicap }}</b></p>
                            </div>
                            <div class="col-md-6">
                                <p>Ngày sinh:<b>{{ moment(donDangKy.dob).format('DD/MM/yyyy') }}</b></p>
                                <p>Giới tính:<b>{{ donDangKy.gioitinh }}</b></p>
                                <p>Số điện thoại:<b>{{ donDangKy.phone }}</b></p>
                                <p>Email:<b>{{ donDangKy.email }}</b></p>
                                <p>Diện chính sách:<b>Hộ nghèo</b></p>
                                <p>Trạng thái: <b>
                                        <span v-if="donDangKy.status === 0" style="color: darkgreen;">Đang chờ</span>
                                        <span v-if="donDangKy.status === 1">Đã hoàn thành</span>
                                        <span v-if="donDangKy.status === -1" style="color: red;">Đã từ chối</span></b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- khối bên phải -->
                <div class="col-lg-5 mx-0 border">
                    <h4>MINH CHỨNG</h4>
                    <div class="row">
                        <div class=" col-lg-6">
                            <h6>Ảnh CCCD mặt trước</h6>
                            <div class="d-flex justify-content-center align-items-center img-thumbnail"
                                style="width: 150px; height: 150px;">
                                <img :src="'img/' + donDangKy.anhCccdMattruoc" alt="Image"
                                    style="max-width: 100%; max-height: 80%;">
                            </div>
                        </div>

                        <div class=" col-lg-6">
                            <h6>Ảnh CCCD mặt sau</h6>
                            <div class="d-flex justify-content-center align-items-center img-thumbnail"
                                style="width: 150px; height: 150px;">
                                <img :src="'img/' + donDangKy.anhCccdMatsau" alt="Image"
                                    style="max-width: 100%; max-height: 80%;">
                            </div>
                        </div>
                    </div>
                    <h6>Ảnh 3x4</h6>
                    <div class="d-flex justify-content-center align-items-center img-thumbnail"
                        style="width: 150px; height: 150px;">
                        <img :src="'img/' + donDangKy.anh3x4" alt="Image"
                            style="max-width: 100%; max-height: 80%;">
                    </div>
                </div>
            </div>
        </div>
    </section>
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
    data() {
        return {
            moment: moment,
            usersWithoutId: [],
            showDetails: false,
            donDangKy: [],

        }
    },
    mounted() {
        axios.get('https://localhost:7252/api/DonDangKies/' + this.$route.query.id)
            .then(response => {
                this.donDangKy = response.data;
                console.log(this.donDangKy);
            })
            .catch(error => {
                console.log(error);
            }); 
    },
    methods: { 
        ChangeStatus() {
            axios.put(`https://localhost:7252/api/DonDangKies/` + this.$route.query.id + `/status/1`)
                .then(response => {
                    // Xử lý phản hồi từ server khi thay đổi status thành công
                    console.log(response.data)
                    this.$notify({
                        title: 'Thông báo',
                        text: 'Phê duyệt thành công!',
                        type: 'warning'
                    })
                    // window.location.reload()
                    this.$router.push('table-list');
                })
                .catch(error => {
                    console.log(error.data)
                });
                this.AddSinhVien();
        },
        AddSinhVien(){
            // sau khi update status đơn đăng kí => add thông tin đơn đăng kí vào thông tin
            // của sinh viên
            const { admin,adminID,truong, ...newObject } = this.donDangKy;
            console.log(newObject)
            axios.post("https://localhost:7252/api/SinhViens",newObject)
                .then(response => {
                    // Xử lý phản hồi từ server khi thay đổi status thành công

                    this.$router.push('table-list');
                })
                .catch(error => {
                    console.log(error.data)
                });
        },
        TuChoi() {
            this.usersWithoutId = {
                status: 0,
                hoten: "viet123",
                truongId: 1
            };
            axios.put(`https://localhost:7252/api/DonDangKies/` + this.$route.query.id + `/status/-1`)
                .then(response => {
                    // Xử lý phản hồi từ server khi thay đổi status thành công
                    console.log(response.data)
                    this.$notify({
                        title: 'Thông báo',
                        text: 'Từ chối thành công!',
                        type: 'danger'
                    })
                    // window.location.reload()
                    this.$router.push('table-list');
                })
                .catch(error => {
                    console.log(error.data)
                });
        }
    }
}
</script>

  
  