<template>
  <card>
    <h4 slot="header" class="card-title">Thông tin Admin</h4>
    <form>
      <div class="row">
        <div class="col-md-5">
          <base-input type="text"
                    label="ID"
                    :disabled="isDisabled"
                    placeholder="Admin0001"
                    v-model="user.company">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input type="text"
                    label="Username"
                    :disabled="isDisabled"
                    placeholder="Admin01"
                    v-model="user.username">
          </base-input>
        </div>
        <div class="col-md-3">
          <base-input type="password"
                    label="Password"
                    :disabled="isDisabled"
                    placeholder=""
                    v-model="user.password">
          </base-input>
        </div>
       
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input type="text"
                    label="Họ"
                    :disabled="isDisabled"
                    placeholder="Nguyễn Hoàng"
                    v-model="user.firstName">
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input type="text"
                    label="Tên"
                    :disabled="isDisabled"
                    placeholder="Việt"
                    v-model="user.lastName">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input type="text"
                    label="Địa chỉ"
                    :disabled="isDisabled"
                    placeholder=""
                    v-model="user.address">
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input type="text"
                    label="Số điện thoại"
                    placeholder="0768570252"
                    :disabled="isDisabled"
                    v-model="user.phone">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input type="email"
                    label="Email"
                    :disabled="isDisabled"
                    placeholder="admin@gmail.com"
                    v-model="user.email">
          </base-input>
        </div>  
        
      </div>

    
      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="updateProfile" >
          {{ action }}
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        user: {
          company: 'Admin01',
          username: 'adminviet123',
          email: '',
          firstName: 'Nguyen Hoang',
          lastName: 'Viet',
          address: '02 Thanh Sơn phường Thanh Bình , Hải Châu',
          phone: '0768570252',
          password:'123456'
        },
        isDisabled: true,
        action: 'Cập nhật thông tin'
      }
    },
    methods: {
      updateProfile () {
        //alert('Your data: ' + JSON.stringify(this.user))
        this.isDisabled = !this.isDisabled;
       
        if (this.action === 'Cập nhật thông tin') {
        this.action = 'Lưu!';
      } else {
        this.action = 'Cập nhật thông tin';
        alert('Lưu thành công' )
      }
     
      }
    }
  }

</script>
<style>

</style>
