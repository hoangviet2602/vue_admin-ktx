<template>
    <div class="content">
        <card>
            <h5>ĐĂNG THÔNG BÁO MỚI</h5>
            <div class="row ">

                <div class="col-md-8">
                    <base-input type="text" label="Tiêu đề" placeholder="Nhập tiêu đề thông báo">
                    </base-input>
                </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Nội dung</label>
                            <textarea rows="5" class="form-control border-input" placeholder="Nhập nội dung thông báo">
                            </textarea>
                        </div>
                </div>
                <button class="btn btn-primary mx-auto">Đăng thông báo</button>
            </div>
        </card>
        <card>
            <h3>THÔNG BÁO GẦN ĐÂY</h3>
            <div class="container-fluid">
                <div class="row border border-solid p-4" v-for="item in notificationsData" :key="item.id">
                    <div class="col-lg-2 pb-2">Tiêu đề</div>
                    <div class="col-lg-8"><b>{{ item.tittle }}</b></div>
                    <div class="col-lg-2" style="color:blue">{{ item.time }}</div>
                    <div class="col-lg-2">Nội dung</div>
                    <div class="col-lg-10">{{ item.content }}</div>
                </div>
            </div>
        </card>
    </div>
</template>
<script>
import Card from 'src/components/Cards/Card.vue'
export default {
    components: {
        Card
    },
    data() {
        return {
            notificationsData,
            notification: {
                id: 1,
                tittle: '',
                time: '',
                content: '',

            },
        }
    }
}
const notificationsData = [
    {
        id: 1,
        time: '24/04/2023',
        tittle: 'ĐÓNG TIỀN ĐIỆN NƯỚC THÁNG 4',
        content: 'Thu tiền điện nước tháng 07 năm 2020 sinh viên theo hình thức thu online và thu bằng tiền mặt ' +
            'Để tạo điều kiện thuận lợi trong việc đóng tiền điện, nước phòng ở sinh viên tháng 7/2020. Trung tâm Quản lý Ký túc xá triển khai thu tiền điện, ' +
            ' nước sinh viên tháng 7 năm 2020 bằng hình thức thanh toán online và tiền mặt.Thời gian thu tiền: Từ 0h00 ngày 01/8/2020 đến 24h00 ngày 10/8/2020.'
    }, {
        id: 2,
        time: '24/04/2023',
        tittle: 'ĐÓNG TIỀN ĐIỆN NƯỚC THÁNG 4',
        content: 'Thu tiền điện nước tháng 07 năm 2020 sinh viên theo hình thức thu online và thu bằng tiền mặt ' +
            'Để tạo điều kiện thuận lợi trong việc đóng tiền điện, nước phòng ở sinh viên tháng 7/2020. Trung tâm Quản lý Ký túc xá triển khai thu tiền điện, ' +
            ' nước sinh viên tháng 7 năm 2020 bằng hình thức thanh toán online và tiền mặt.Thời gian thu tiền: Từ 0h00 ngày 01/8/2020 đến 24h00 ngày 10/8/2020.'
    },
    {
        id: 3,
        time: '24/04/2023',
        tittle: 'ĐÓNG TIỀN ĐIỆN NƯỚC THÁNG 4',
        content: 'Thu tiền điện nước tháng 07 năm 2020 sinh viên theo hình thức thu online và thu bằng tiền mặt ' +
            'Để tạo điều kiện thuận lợi trong việc đóng tiền điện, nước phòng ở sinh viên tháng 7/2020. Trung tâm Quản lý Ký túc xá triển khai thu tiền điện, ' +
            ' nước sinh viên tháng 7 năm 2020 bằng hình thức thanh toán online và tiền mặt.Thời gian thu tiền: Từ 0h00 ngày 01/8/2020 đến 24h00 ngày 10/8/2020.'
    }
]
</script>