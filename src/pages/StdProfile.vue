
<template>
  <div>
    <h3> Thông tin sinh viên</h3>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'tab1' }" @click="activeTab = 'tab1'" href="#">Thông tin các
          nhân</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'tab2' }" @click="activeTab = 'tab2'" href="#">Thông tin cư
          trú</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'tab3' }" @click="activeTab = 'tab3'" href="#">Minh chứng</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'tab4' }" @click="activeTab = 'tab4'" href="#">Tài khoản</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'tab5' }" @click="activeTab = 'tab5'" href="#">Lịch sử thu
          phí</a>
      </li>
    </ul>
    <div class="tab-content">
      <div v-show="activeTab === 'tab1'" class="tab-pane active">

        <h4>THÔNG TIN SINH VIÊN</h4>

        <div class="col-lg-12 mx-0 ">
          <!-- cotent -->

          <!-- ảnh -->
          <div class="row">
            <div class="col-lg-4 mx-0  border-right ">
              <div class="mx-auto img-thumbnail" style="width: 300px; height: 300px;">
                <img src="" alt="Image" style="max-width: 100%; max-height: 100%;">
              </div>
            </div>
            <!-- tab 1 -->
            <div class="col-lg-8  ">

              <h4 class="mt-0">NGUYỄN HOÀNG VIỆT</h4>
              <table class="table1">
                <tbody>
                  <tr>
                    <th scope="row">Ngày sinh</th>
                    <td>26/02/2001</td>
                  </tr>
                  <tr>
                    <th scope="row">Giới tính</th>
                    <td>Nam</td>
                  </tr>
                  <tr>
                    <th scope="row">Điện thoại sinh viên</th>
                    <td>0768570252</td>
                  </tr>
                  <tr>
                    <th scope="row">SV năm</th>
                    <td>5</td>
                  </tr>
                  <tr>
                    <th scope="row">Sinh viên trường</th>
                    <td>Đại học Sư Phạm Kỹ Thuật Đà Nẵng</td>
                  </tr>
                  <tr>
                    <th scope="row">Khoa</th>
                    <td>Công nghệ số</td>
                  </tr>
                  <tr>
                    <th scope="row">Mã sinh viên</th>
                    <td>1911505310169</td>
                  </tr>
                  <tr>
                    <th scope="row">Mã ký túc xá</th>
                    <td>101A1911505310169</td>
                  </tr>
                  <tr>
                    <th scope="row">Tôn giáo</th>
                    <td>không</td>
                  </tr>
                  <tr>
                    <th scope="row">Dân tộc</th>
                    <td>Kinh</td>
                  </tr>
                  <tr>
                    <th scope="row">Quốc gia</th>
                    <td>Việt Nam</td>
                  </tr>
                  <tr>
                    <th scope="row">CCCD</th>
                    <td>1234124123</td>
                  </tr>
                  <tr>
                    <th scope="row">Ngày cấp CCCD</th>
                    <td>20/1/2021</td>
                  </tr>
                  <tr>
                    <th scope="row">Nơi cấp CCCD</th>
                    <td>Huế</td>
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
        <h1>Tab 4 content</h1>
      </div>
      <div v-show="activeTab === 'tab5'" class="tab-pane active">
        <h1>Tab 5 content</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'tab1'
    }
  }
}
</script>
<style>
.table1 {
  border-collapse: collapse;
  width: 100%;
  font-family: Arial, sans-serif;
  font-size: 14px;
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