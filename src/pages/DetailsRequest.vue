<template>
    <section>
        <h2><b>Chi tiết yêu cầu</b></h2>
        <div class="container">
            <div class=" row d-flex justify-content-end">
                <button v-if="donDangKy.status == 0"  class="btn btn-primary m-2" @click="ChangeStatus()">Phê duyệt</button>
                <button v-if="donDangKy.status == 0" class="btn btn-warning m-2" @click="LyDoTuChoi()">Từ chối</button>
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
                                <p>Trạng thái: <b>
                                        <span v-if="donDangKy.status === 0" style="color: darkgreen;">Đang chờ</span>
                                        <span v-if="donDangKy.status === 1">Đã hoàn thành</span>
                                        <span v-if="donDangKy.status === -1" style="color: red;">Đã từ chối</span></b>
                                </p>
                            </div>
                            <div class="col-md-6">
                                <p>Ngày sinh:<b>{{ moment(donDangKy.dob).format('DD/MM/yyyy') }}</b></p>
                                <p v-if="donDangKy.gioitinh == 1">Giới tính:<b>Nam</b></p>
                                <p v-if="donDangKy.gioitinh == 2">Giới tính:<b>Nam</b></p>
                                <p v-if="donDangKy.gioitinh == 0">Giới tính:<b>Khác</b></p>
                                <p>Số điện thoại:<b>{{ donDangKy.phone }}</b></p>
                                <p>Email:<b>{{ donDangKy.email }}</b></p>
                                <p>Diện chính sách:<b>{{ donDangKy.dienchinhsach }}</b></p>
                                <p>Hộ khẩu thường trú:<b>{{ donDangKy.hoKhauThuongTru }}</b></p>

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
                        <img :src="'img/' + donDangKy.anh3x4" alt="Image" style="max-width: 100%; max-height: 80%;">
                    </div>
                </div>
            </div>
        </div>
         <!-- Sub form hủy phòng -->
     <div v-if="showSubform" class="backdrop">
          <div class="subform">
            <div class="row  ">
              <div class="col-sm-10 ">
                <h5> <b>TỪ CHỐI</b> </h5>
              </div>
              <div class="col-sm-2 ">
                <Button variant="outline" color="dark" class="btn btn-sm btn-light" @click="showSubform = false">
                  Đóng</Button>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-5">
                <p>Lí do từ chối:</p>
                
              </div>
              <div class="col-sm-7">
                <p><b></b></p>
               
              </div>
            </div>
            <div class="col-sm-10 mt-2">
              <input v-model="lydo" type="text" placeholder="lý do từ chối" class="form-control"  required/>
            </div>
            <div class="row pt-5">
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-danger" @click="showSubform = false">Hủy bỏ</button>
              </div>
              <div class="col-sm-6 mx-auto d-flex justify-content-center flex-column">
                <button class="btn btn-sm btn-primary" @click="LyDoTuChoi">Xác nhận</button>
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
           
            showSubform: false,
            lydo:''
         
        }
    },
    mounted() {
        this.GetData()
       
    },
    methods: {
        GetData() {
            axios.get('https://localhost:7252/api/DonDangKies/' + this.$route.query.id)
                .then(response => {
                    this.donDangKy = response.data;
                    console.log(this.donDangKy);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        ChangeStatus() {
            
            // update trạng thái của đơn đăng kí
            axios.put(`https://localhost:7252/api/DonDangKies/` + this.$route.query.id + `/status/1`)
                .then(response => {
                    // Xử lý phản hồi từ server khi thay đổi status thành công
                  
                    this.$notify({
                        title: 'Thông báo',
                        text: 'Phê duyệt thành công!',
                        type: 'warning'
                    })
                   
                    this.$router.push('table-list');
                })
                .catch(error => {
                    console.log(error.data)
                });
                this.AddSinhVien();

        },
        AddSinhVien() {
            // sau khi update status đơn đăng kí => add thông tin đơn đăng kí vào thông tin
            // của sinh viên
            this.GetData()
            const { admin, adminID, truong, ...newObject } = this.donDangKy;
            newObject.username = newObject.hoten.normalize("NFD")
                                                .replace(/[\u0300-\u036f\s]/g, "")
                                                .toLowerCase();
                                           
            newObject.password = '12345678'

            axios.post("https://localhost:7252/api/SinhViens", newObject)
                .then(response => {
                    // Xử lý phản hồi từ server khi thay đổi status thành công

                    this.$router.push('table-list');
                })
                .catch(error => {
                    console.log(error.data)
                });
            this.EmailChapNhan(newObject.username);
        },
        EmailChapNhan(username){
            axios.post("https://localhost:7252/api/Email", {nguoinhan :"hoangvietnguyen2602@gmail.com" , 
                                                            tieude:"Kí túc xá đại học sư phạm kỹ thuật thông báo",
                                                        noidung: "<!DOCTYPE html><html> <head></head>  <body> "
                                                        +" <p>Chúng tôi xin thông báo rằng đơn đăng kí ở kí túc xá của bạn đã được phê duyệt.</p>"
                                                        +   "<p>Cảm ơn bạn đã đăng kí và chúc bạn một kỳ kí túc xá tuyệt vời!</p></body></html>"
                                                        + "<p>Tài khoản : " + username +"</p>"
                                                        + "<p>Mật khẩu: 12345678 </p>"})
                .then(response => {
                    // Xử lý phản hồi từ server khi thay đổi status thành công

                    this.$router.push('table-list');
                })
                .catch(error => {
                    console.log(error.data)
                });
        },
        EmailTuChoi(){
            axios.post("https://localhost:7252/api/Email", {nguoinhan :"hoangvietnguyen2602@gmail.com" , 
                                                            tieude:"Kí túc xá đại học sư phạm kỹ thuật thông báo",
                                                        noidung: "<!DOCTYPE html><html> <head></head>  <body> "
                                                        +" <p>Chúng tôi xin thông báo rằng đơn đăng kí ở kí túc xá của bạn chưa được phê duyệt.</p>"
                                                        +   "Lí do:"+ this.lydo +"</body></html>"})
                .then(response => {
                    // Xử lý phản hồi từ server khi thay đổi status thành công

                    this.$router.push('table-list');
                })
                .catch(error => {
                    console.log(error.data)
                });
        },
        LyDoTuChoi(){
            this.showSubform=true
            if(this.lydo == ''){
                this.$notify({
                        title: 'Thông báo',
                        text: 'Vui lòng nhập lí do!',
                        type: 'warning'
                    })
            }else{
                this.TuChoi()
                this.showSubform = false
            }
        },
        TuChoi() {
            // this.usersWithoutId = {
            //     status: 0,
            //     hoten: "viet123",
            //     truongId: 1
            // };
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
                this.EmailTuChoi()
            }
    }
}
</script>


  
  