
<template>
  <div>
    <h3> Thông tin sinh viên</h3>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'tab1' }" @click="activeTab = 'tab1'" href="#">Thông tin các
          nhân</a>
      </li>
      
    
      
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'tab5' }" @click="activeTab = 'tab5'" href="#">Lịch sử thu
          phí</a>
      </li>
    </ul>
    <div class="tab-content">
      <div v-show="activeTab === 'tab1'" class="tab-pane active">

        <h4>THÔNG TIN SINH VIÊN</h4>

        <div class="col-lg-12 mx-0 " v-for="item in sinhVien" :key="item.sv.id">
          <!-- cotent -->

          <!-- ảnh -->
          <div class="row">
            <div class="col-lg-4 mx-0  border-right ">
              <div class="mx-auto img-thumbnail" style="width: 300px; height: 300px;">
                <img :src="'img/' + item.sv.anh3x4" alt="Image" style="max-width: 100%; max-height: 100%;">
              </div>
            </div>
            <!-- tab 1 -->
            <div class="col-lg-8  ">

              <h4 class="mt-0">{{  }}</h4>
              <table class="table1">
                <tbody>
                  <tr>
                    <th scope="row">Ngày sinh</th>
                    <td>{{moment(item.sv.dob).format('DD/MM/yyyy')}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Giới tính</th>
                    <td v-if="item.sv.gioitinh == 1">Nam</td>
                    <td v-if="item.sv.gioitinh == 0">Nữ</td>
                  </tr>
                  <tr>
                    <th scope="row">Điện thoại sinh viên</th>
                    <td>{{ item.sv.phone}}</td>
                  </tr>
                  <tr>
                    <th scope="row">SV năm</th>
                    <td>{{ item.sv.namhoc}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Sinh viên trường</th>
                    <td>{{ item.name }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Ngành</th>
                    <td>{{ item.sv.nganhhoc}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mã sinh viên</th>
                    <td>{{ item.sv.masinhvien}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mã ký túc xá</th>
                    <td>{{ item.sv.id}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Tôn giáo</th>
                    <td>{{ item.sv.tonGiao}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Quốc tịch</th>
                    <td>{{ item.sv.quocTich}}</td>
                  </tr>
                  
                  <tr>
                    <th scope="row">CCCD</th>
                    <td>{{ item.sv.cccd}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Ngày cấp CCCD</th>
                    <td>{{ moment(item.sv.ngaycap).format('DD/MM/yyyy')  }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Nơi cấp CCCD</th>
                    <td>{{ item.sv.noicap}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Hộ khẩu thường trú</th>
                    <td>{{ item.sv.hoKhauThuongTru}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      <div v-show="activeTab === 'tab2'" class="tab-pane active">
        <h1>Tab 2 content</h1>
      </div>
      <div v-show="activeTab === 'tab3'" class="tab-pane active">
        <h1>Tab 3 content</h1>
      </div>
      <div v-show="activeTab === 'tab4'" class="tab-pane active">
      
      </div>
      <div v-show="activeTab === 'tab5'" class="tab-pane active">
        <h1>Tab 5 content</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  data() {
    return {
      moment,
      activeTab: 'tab1',
      sinhVien: []
    }
  },
  mounted() {
    axios.get(`https://localhost:7252/api/SinhViens/`+ this.$route.query.id)
      .then(response => {
        this.sinhVien = response.data;
        
        console.log(this.sinhVien);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
<style>
.table1 {
  border-collapse: collapse;
  width: 100%;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-bottom: 20px;
}

.table1 th,
td {
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;

}

.table tbody th {
  font-weight: normal;
  width: 200px;
}

.table1 tbody tr td {
  text-transform: uppercase;
  font-weight: bold;
}

th {
  background-color: #f2f2f2;
  font-weight: normal;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}</style>