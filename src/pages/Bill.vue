
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
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Họ và tên</th>
                                <th>Phòng</th>
                                <th>Kì</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableData" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.hovaten }}</td>
                                <td>{{ item.phong }}</td>
                                <td>{{ item.ki }}</td>
                                <td>{{ item.tongtien }}</td>
                                <td>{{ item.trangthai }}</td>
                                <td>
                                    <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->
                                    <router-link to="/admin/details">
                                        <button class="btn btn-primary">Xem chi tiết</button>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </card>
            </div>
            <div v-show="activeTab === 'tab2'" class="tab-pane active">
                <card class="strpied-tabled-with-hover" body-classes="table-full-width table-responsive">
                    <template slot="header">
                        <div class="row">
                            <p>(*) Giá chỉ số điện: 3.000 VNĐ/kWh - Giá chỉ số nước: 15.000/ m3</p>
                        
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
                                <button class="btn btn-primary pr-2">Upload hóa đơn</button>
                            </div>
                        </div>
                        <p class="card-category"></p>
                    </template>
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tên phòng</th>
                                <th>Từ ngày</th>
                                <th>Đến ngày</th>
                                <th>CS điện cũ</th>
                                <th>CS điện mới</th>
                                <th>CS nước cũ</th>
                                <th>CS nước mới</th>
                                <th>Tổng tiền</th>
                                <th>Tình trạng</th>
                                <th>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableData2" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.phong }}</td>
                                <td>{{ item.startdate }}</td>
                                <td>{{ item.enddate }}</td>
                                <td>{{ item.olddien }}</td>
                                <td>{{ item.newdien }}</td>
                                <td>{{ item.oldnuoc }}</td>
                                <td>{{ item.newnuoc }}</td>
                                <td>{{ item.total }}</td>
                                <td>{{ item.status }}</td>
                                <td>
                                    <!-- <button class="btn btn-primary" @click="showDetails = true">Xem chi tiết</button> -->
                                    <router-link to="/admin/details">
                                        <button class="btn btn-primary">Chỉnh sửa</button>
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </card>

            </div>

        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            activeTab: 'tab1',
            tableData,
            tableData2,
            showDetails: false,
        }
    }
}


const tableData = [
    {
        id: 1,
        hovaten: 'Nguyễn Văn A',
        phong: 'A216',
        ki: 'Kì 1/2023',
        tongtien: 250000,
        trangthai: 'Chưa đóng',
    },
    {
        id: 1,
        hovaten: 'Nguyễn Văn A',
        phong: 'A216',
        ki: 'Kì 1/2023',
        tongtien: 250000,
        trangthai: 'Chưa đóng',
    },
    {
        id: 1,
        hovaten: 'Nguyễn Văn A',
        phong: 'A216',
        ki: 'Kì 1/2023',
        tongtien: 250000,
        trangthai: 'Chưa đóng',
    }
]
const tableData2 = [
    {
        id: 1,
        phong: 'A216',
        startdate: '26/02/2023',
        enddate: '26/03/2023',
        olddien: 123,
        newdien: 130,
        oldnuoc: 75,
        newnuoc: 90,
        total: 250000,
        status: 'Chưa đóng'

    },
    {
        id: 2,
        phong: 'A216',
        startdate: '26/02/2023',
        enddate: '26/03/2023',
        olddien: 123,
        newdien: 130,
        oldnuoc: 75,
        newnuoc: 90,
        total: 250000,
        status: 'Chưa đóng'
    },
    {
        id: 3,
        phong: 'A216',
        startdate: '26/02/2023',
        enddate: '26/03/2023',
        olddien: 123,
        newdien: 130,
        oldnuoc: 75,
        newnuoc: 90,
        total: 250000,
        status: 'Chưa đóng'
    }
    ,
    {
        id: 4,
        phong: 'A216',
        startdate: '26/02/2023',
        enddate: '26/03/2023',
        olddien: 123,
        newdien: 130,
        oldnuoc: 75,
        newnuoc: 90,
        total: 250000,
        status: 'Chưa đóng'
    }
    ,
    {
        id: 5,
        phong: 'A216',
        startdate: '26/02/2023',
        enddate: '26/03/2023',
        olddien: 123,
        newdien: 130,
        oldnuoc: 75,
        newnuoc: 90,
        total: 250000,
        status: 'Chưa đóng'
    }   
]

</script>
 