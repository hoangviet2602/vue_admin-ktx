<template>
    <div class="content">

        <card>
            <h5>ĐĂNG THÔNG BÁO MỚI</h5>
            <div class="row ">

                <div class="col-md-8">
                    <label><b>Tiêu đề</b></label>
                    <editor v-model="tittle" :init="initSettings2" :id="editorTittle"></editor>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label><b>Nội dung</b></label>
                        <div>
                            <editor v-model="content" :init="initSettings" :id="editorId"></editor>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary mx-auto" @click="SubmitThongBao">Đăng thông báo</button>
            </div>
        </card>
        <card>
            <h3>THÔNG BÁO GẦN ĐÂY</h3>
            <div class="container-fluid">
                <div class="row border border-solid p-4" v-for="item in notification" :key="item.id">
                    <div class="col-lg-2 pb-2">Tiêu đề</div>
                    <div class="col-lg-8"><b>
                            <pre class="prestyle" v-html="item.tittle"></pre>
                        </b></div>
                    <div class="col-lg-2" style="color:blue">{{ moment(item.ngaydang).format('DD/MM/yyyy') }}</div>
                    <div class="col-lg-2">Nội dung</div>
                    <div class="col-lg-10">
                        <pre class="prestyle" v-html="item.content"></pre>
                    </div>
                </div>
            </div>
        </card>
    </div>
</template>
<script>
import Card from 'src/components/Cards/Card.vue'
import Editor from 'vue-tinymce-editor'
import axios from 'axios';
import moment from 'moment';
export default {
    components: {
        Card,
        Editor
    },
    data() {
        return {
            moment: moment,

            notification: [],
            // timymce
            editorId: 'myContent',
            editorTittle: 'myTittle',
            content: '',
            tittle: '',
            initSettings: {
                selector: '#myContent',
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                language: 'vi', // thiết lập ngôn ngữ Tiếng Việt,
                language_url: 'D:/IT/ĐATN/langs/vi.js', // đường dẫn đến file ngôn ngữ Tiếng Việt
                entity_encoding: 'raw',
            },
            initSettings2: {
                selector: '#myTittle',
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                language: 'vi', // thiết lập ngôn ngữ Tiếng Việt,
                language_url: 'D:/IT/ĐATN/langs/vi.js', // đường dẫn đến file ngôn ngữ Tiếng Việt
                entity_encoding: 'raw',
            }
        }
    },
    methods: {
        SubmitThongBao() {
            // var jsonContent = JSON.stringify(this.content).replace(/[<>]/g, function (m) {
            //     return {
            //         '<': '\\u003c',
            //         '>': '\\u003e',
            //         '"': ''
            //     }[m];
            // });
            // var jsonTittle = JSON.stringify(this.tittle).replace(/[<>]/g, function (m) {
            //     return {
            //         '<': '\\u003c',
            //         '>': '\\u003e',
            //         '"': ''
            //     }[m];
            // });

            // console.log(jsonTittle)
            // console.log(jsonContent)
           
            axios.post('https://localhost:7252/api/ThongBaos', { tittle: this.tittle, content: this.content })
                .then(response => {
                    this.notification = response.data;

                    this.$notify({
                        title: 'Thông báo',
                        text: 'Đăng thông báo thành công!',
                        type: 'success'
                    })

                })
                .catch(error => {
                    console.log(error);
                });


        }
    },
    mounted() {

        axios.get('https://localhost:7252/api/ThongBaos')
            .then(response => {
                this.notification = response.data;

                console.log(this.notification);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

</script>
<style>
.prestyle {
    white-space: pre-wrap;
}
</style>