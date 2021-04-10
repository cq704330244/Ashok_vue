<template>
  <div class="tree">
    <div v-if="isDepartment" class="breadcrumb">
      <div class="back" @click="goTopLevel">
        <van-icon name="share-o" size="16" color="#1890ff" />
        <span>返回上一级</span>
      </div>
      <div class="departmentName">
        {{ department ? splitSrings(department.name) : '' }}
      </div>
    </div>
    <div v-if="!isDepartment" class="breadcrumb">
      <div class="call">
        通讯录
      </div>
    </div>
    <div
      class="content"
      :style="{ height: isDepartment ? 'calc(100vh - 106px)' : '100vh' }"
    >
      <div
        v-for="(item, index) in treeDatas"
        :key="item.children ? `dep${index}` : `per${index}`"
        v-bind:class="{
          'list-person': !item.children,
          'list-item': item.children
        }"
      >
        <list-item
          :item="item"
          @goNextLevel="goNextLevel(item, index)"
          @departmentChange="departmentChange(item)"
          @personChange="departmentChange(item)"
          :checkedNameArr="checkedNames"
        />
      </div>
    </div>
    <div v-show="checkedPersonData.length > 0" class="footer">
      <div class="textbtn">
        已选择 {{ checkedPersonData.length }} 人
        <van-icon
          v-show="!show"
          name="arrow-up"
          size="16"
          color="#1890ff"
          @click="openpopup"
        />
        <van-icon
          v-show="show"
          name="arrow-down"
          size="16"
          color="#1890ff"
          @click="closepopup"
        />
      </div>
      <van-button type="info" @click="confirm"
        >确认（ {{ checkedPersonData.length }} /
        {{ totalDatas.length > 1000 ? '999+' : totalDatas.length }}
        ）</van-button
      >
    </div>
    <van-popup
      v-model="show"
      position="bottom"
      safe-area-inset-bottom
      closeable
      :style="{ height: '70vh' }"
    >
      <div class="personList">
        <div
          v-for="(per, index) in checkedPersonData"
          :key="index"
          class="personList-item"
        >
          <div class="person-item personList-item">
            <img :src="per.avart" alt="" />
            <div class="item-space">
              <div class="first">
                <div>{{ per.name }}</div>
                <div class="tag">{{ per.department }}</div>
              </div>
              <div class="last">{{ per.department }}</div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { treeData } from './const'
import listItem from './listItem'
import personItem from './personItem'
import { getPerson, splitSring } from './utils'
export default {
  name: 'tree',
  computed: {
    checkedPersonData() {
      return getPerson(this.checkedNames)
    }
  },
  data() {
    return {
      show: false,
      allChecked: false,
      treeDatas: [],
      checkedNames: [],
      isDepartment: false,
      department: {},
      departmentTree: [],
      totalDatas: [],
      activeIndex: 0
    }
  },

  mounted() {
    this.treeDatas = treeData
    this.totalDatas = getPerson(treeData)
  },
  components: {
    'list-item': listItem,
    'person-item': personItem
  },
  methods: {
    splitSrings(str) {
      return splitSring(str)
    },
    toggle(item) {
      console.log('===========>', item)
      const exist = this.checkedNames.includes(item)
      if (exist) {
        const Index = this.checkedNames.findIndex((val, index) => {
          return val === item
        })
        this.checkedNames.splice(Index, 1)
      } else {
        this.checkedNames.push(item)
      }
    },
    goNextLevel(item, index) {
      console.log(item)
      this.departmentTree.push(this.treeDatas)
      this.treeDatas = item.children
      this.department = item
      this.isDepartment = true
    },
    departmentChange(item) {
      const exist = this.checkedNames.includes(item)
      if (exist) {
        const Index = this.checkedNames.findIndex((val, index) => {
          return val === item
        })
        this.checkedNames.splice(Index, 1)
      } else {
        this.checkedNames.push(item)
      }
    },
    goTopLevel() {
      this.treeDatas = this.departmentTree.pop()
      if (this.departmentTree.length === 0) {
        this.department = {}
        this.isDepartment = false
      }
    },
    openpopup() {
      this.show = true
    },
    closepopup() {
      this.show = false
    },
    confirm() {
      console.log(
        '🚀 ~ file: index.vue ~ line 96 ~ confirm ~ 已选人员列表',
        this.checkedPersonData
      )
    }
  }
}
</script>

<style lang="less">
@import '../../style/global.less';
.tree {
  background: #f5f5f5;
  position: relative;
  height: 100vh;
  .van-popup {
    padding: 42px 0 60px;
  }
}

.breadcrumb {
  position: relative;
  height: 36px;
  padding: 0 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  .back {
    position: absolute;
    top: 10px;
    left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > span {
      margin-left: 5px;
      color: #1890ff;
    }
  }
  .departmentName,
  .call {
    text-align: center;
    margin: auto;
  }
}

.content {
  background: #fff;
  overflow-y: auto;
  padding-bottom: 60px;
}
.footer {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 3000;
  height: 50px;
  padding: 5px 20px;
  width: calc(100% - 40px);
  border-top: solid 1px #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .van-button {
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
  }
  .textbtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-icon {
      margin-left: 5px;
    }
  }
}
.personList {
  width: calc(100% - 40px);
  height: 100%;
  padding: 0 20px;
  overflow: auto;
  .personList-item {
    .item-space {
      flex: 1 1 auto;
    }
  }
}
</style>
