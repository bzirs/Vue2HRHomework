<template>
  <!-- 新增弹框 -->
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="showDialog"
  >
    <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleForm.description" />
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary" @click="hSubmit">确定</el-button>
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
  methods: {}
}
</script>

<style scoped lang=''>
</style>
