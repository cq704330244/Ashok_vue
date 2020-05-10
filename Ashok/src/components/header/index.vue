<template>
  <div class="as-header">
    <div class="as-logo">
      <img src="../../assets/aslogo.png" alt="" />
    </div>
    Ashok
    <div class="as-user" @click="showinformation">
      <img :src="userInfo.image || sessionUser.image" alt="" />
    </div>
    <el-drawer
      title="我是标题"
      :visible.sync="showUser"
      :modal="false"
      :with-header="false"
      class="userinfowrap"
    >
      <div class="usercontainer">
        <div class="line">
          <img src="../../assets/usericon/num.png" alt="" />
          <div>
            {{ sessionUser.name }}
          </div>
          <img src="../../assets/usericon/daren.png" alt="" id="staus" />
        </div>
        <div class="line">
          <img class="em" src="../../assets/usericon/em.png" alt="" />
          <div>
            {{ sessionUser.email }}
          </div>
        </div>
        <div class="line">
          <img src="../../assets/usericon/user.png" />
          <div>
            {{ sessionUser.sex }}
          </div>
          <div>
            {{ sessionUser.age + '岁' }}
          </div>
          <div>
            {{ sessionUser.bith }}
          </div>
        </div>
        <div class="line">
          <img src="../../assets/usericon/say.png" alt="" />
          <div class="signature">
            {{ sessionUser.signature }}
          </div>
        </div>
        <div class="line">
          <img src="../../assets/usericon/level.png" alt="" />
          <img src="../../assets/usericon/huang.png" class="em" alt="" />
        </div>
        <div class="line">
          <img src="../../assets/usericon/tool.png" alt="" />
          <img class="em" src="../../assets/usericon/statues.png" alt="" />
          <img class="em" src="../../assets/usericon/email.png" alt="" />
        </div>
        <div class="address">
          <img src="../../assets/usericon/address.png" id="icon" alt="" />
          <div>
            <div class="detials">
              <div class="label">所在地</div>
              <div class="text">
                {{ provice.label }}
                {{ city.label }}
              </div>
            </div>
            <div class="detials">
              <div class="label">手机</div>
              <div class="text">
                {{ sessionUser.tel }}
              </div>
            </div>
            <div class="detials">
              <div class="label">血型</div>
              <div class="text">
                {{ sessionUser.blood + '型' }}
              </div>
            </div>
            <div class="detials">
              <div class="label">家乡</div>
              <div class="text">
                {{ sessionUser.country }}
                {{ provice.label }}
                {{ city.label + '市' }}
              </div>
            </div>
            <div class="detials">
              <div class="label">职业</div>
              <div class="text">
                {{ sessionUser.title }}
              </div>
            </div>
            <div class="detials">
              <div class="label">学校</div>
              <div class="text">
                {{ sessionUser.collage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      sessionUser: {},
      showUser: false,
      gergraphic: '',
      provice: '',
      city: ''
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.login.userInfo
    })
  },
  mounted() {
    this.sessionUser = JSON.parse(sessionStorage.getItem('userInfo'))
    this.gergraphic = this.sessionUser.gergraphic
    this.provice = this.gergraphic.provice
    this.city = this.gergraphic.city
  },
  methods: {
    showinformation() {
      this.showUser = true
      console.log(this.sessionUser)
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
