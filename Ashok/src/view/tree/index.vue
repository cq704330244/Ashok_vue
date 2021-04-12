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
    <div class="all-select" @click="handleAllSelect">
      <input type="checkbox" v-model="allChecked" />
      <span>全选</span>
    </div>
    <div
      class="content"
      :style="{ height: show ? 'calc(100vh - 208px)' : 'calc(100vh - 87px)' }"
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
          @goNextLevel="goNextLevel(item)"
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
          v-for="(per, index) in checkedNames"
          :key="index"
          class="personList-item"
        >
          <list-item
            :item="per"
            :see="true"
            @deletePerson="deletePerson(per)"
            :checkedNameArr="checkedNames"
          />
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
  watch: {
    checkedNames(val, oldVal) {
      let notExist = this.treeDatas.every(d => {
        return this.checkedNames.includes(d)
      })
      if (notExist) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
    }
  },
  methods: {
    splitSrings(str) {
      return splitSring(str)
    },
    toggle(item) {
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
    goNextLevel(item) {
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
    deletePerson(per) {
      const exist = this.checkedNames.includes(per)
      if (exist) {
        const Index = this.checkedNames.findIndex((val, index) => {
          return val === per
        })
        this.checkedNames.splice(Index, 1)
        if (this.checkedNames.length <= 0) {
          this.show = false
        }
      }
    },
    goTopLevel() {
      this.treeDatas = this.departmentTree.pop()
      if (this.departmentTree.length === 0) {
        this.department = {}
        this.isDepartment = false
      }
    },
    handleAllSelect() {
      this.allChecked = !this.allChecked
      if (this.allChecked) {
        this.treeDatas.forEach(tree => {
          const exist = this.checkedNames.includes(tree)
          if (!exist) {
            this.checkedNames.push(tree)
          }
        })
      } else {
        this.treeDatas.forEach(tree => {
          const Index = this.checkedNames.findIndex((val, index) => {
            return val === tree
          })
          this.checkedNames.splice(Index, 1)
        })
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
  .van-popup {
    padding: 42px 0 60px;
  }
}
.all-select {
  height: 36px;
  padding: 5px 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  > span {
    margin-left: 10px;
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
  position: relative;
}
.footer {
  background: #fff;
  position: fixed;
  bottom: 0;
  z-index: 3000;
  height: 50px;
  padding: 5px 20px;
  width: calc(100vw - 261px);
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
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
