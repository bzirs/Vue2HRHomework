<template>
  <!-- 新增弹框 -->
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="showDialog"
    :before-close="handleClose"
    width="30%"
  >

    <slot name="form" />
    <!-- 底部 -->
    <el-row slot="footer" type="flex">
      <el-col :span="24">
        <el-button size="small" @click="handleCancel">取消</el-button>
        <el-button size="small" type="primary" @click="$emit('handleSubmit')">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogComponent',
  components: {},
  directives: {},
  props: {
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    showDialog: {
      type: Boolean
    }
  },
  data() {
    return {

    }
  },
  computed: {},
  watch: {},
  async created() {},
  mounted() {},
  activated() {},
  updated() {},
  methods: {
    // 关闭前回调
    handleClose() {
      this.$emit('update:showDialog', false)
    },
    // 取消
    handleCancel() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped lang=''>
</style>
