<template>
    <div class="content">
        <h3><b>Quản lý phòng</b></h3>

        <div class="container-fluid bg-light ">
            <h3 class="text-dark my-4 "> <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option selected>Tất cả</option>
                    <option value="1">Khu A</option>
                    <option value="2">Khu B</option>
                    <option value="3">Khu C</option>

                </select> Tổng số giường <p class="number">{{ getTotalGiuong() }}</p> - Tổng số giường trống <p
                    class="number">{{ getTotalGiuong() - getTotalSV() }}</p> - Tổng
                số sinh viên đang thuê
                <p class="number">{{ getTotalSV() }}</p>
            </h3>
        </div>

        <div class="row border">

            <div class="room" v-for="(item, idex) in paginatedItems" :key="item.id">
                <p class="tittle">{{ item.tenphong }}</p>
                <div class="row">
                    <div class="col-sm-9">
                        <p>TS giường:</p>
                        <p>TS số giường trống:</p>
                        <p>TS số sinh viên:</p>
                    </div>
                    <div class="col-sm-3">
                        <p></p>
                        <p><b>{{ item.slgiuong }}</b></p>
                        <p><b>{{ item.slgiuong - item.slSv }}</b></p>
                        <p><b>{{ item.slSv }}</b></p>

                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-sm-7">
                        <button class="btn btn-sm btn-primary">Chỉnh sửa</button>
                    </div>
                    <div class="col-sm-5">
                        <button class="btn btn-sm btn-danger">Xóa</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="pagination-container">
            <div class="pagination">
                <a @click="previousPage" :disabled="currentPage === 1">&laquo;</a>
                <a v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="goToPage(page)">
                    {{ page }}
                </a>
                <a @click="nextPage" :disabled="currentPage === totalPages">&raquo;</a>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';


export default ({
    components: {

    },
    computed: {
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.listRoom.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.listRoom.length / this.itemsPerPage);
        },
    },
    data() {
        return {
            listRoom: [],
            currentPage: 1, // The current page number
            itemsPerPage: 10, // The number of items to display per page
        }
    },
    methods: {
        getData() {
            axios.get("https://localhost:7252/api/Phongs").then(respone => {
                this.listRoom = respone.data
                console.log(respone.data)
            })
                .catch(error => {
                    console.log(error)
                })
        },
        getTotalGiuong() {
            let total = 0;
            for (const item of this.listRoom) {
                total += item.slgiuong;
            }
            return total;
        },
        getTotalSV() {
            let total = 0;
            for (const item of this.listRoom) {
                total += item.slSv;
            }
            return total;
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        goToPage(page) {
            this.currentPage = page;
        },
    },
    mounted() {
        this.getData()
    }
})


</script>
<style>
.room {
    width: 200px;
    height: 200px;
    float: left;
    border: 1px solid #ccc;
    margin: 15px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
}

.room:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.room .tittle {
    color: #333;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
}

.room p {
    margin: 0;
    font-size: 14px;
}

.room .row {
    margin-top: 20px;
}

.room button {
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
}

.room .btn-primary {
    color: #fff;
    background-color: #007bff;
    border: none;
}

.room .btn-primary:hover {
    background-color: #0056b3;
}

.room .btn-danger {
    color: #fff;
    background-color: #dc3545;
    border: none;
}

.room .btn-danger:hover {
    background-color: #9f2f3e;
}

.number {
    background-color: cornflowerblue;
    border-radius: 5px;
    display: inline-block;
    padding: 5px 10px;
    color: white;
    font-weight: bold;
    font-size: 16px;
}

select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    width: 80px;
}

select:hover {
    border-color: #888;
}

select:focus {
    outline: none;
    border-color: #555;
    box-shadow: 0 0 5px rgba(85, 85, 85, 0.5);
}
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination {
    display: inline-block;
    align-items: center;
}

.pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    cursor: pointer;

}

.pagination a.active {
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;

}

.pagination a:hover:not(.active) {
    background-color: #ddd;
    border-radius: 5px;

}
</style>