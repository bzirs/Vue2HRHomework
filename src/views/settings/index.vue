<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="handleAdd">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="rows">
              <el-table-column label="序号" width="120" type="index" :index="indexMethod" />
              <el-table-column label="角色名称" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template v-slot="{ row: { id } }" width="200">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="handleEdit(id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleRemove(id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                :current-page="params.page"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="params.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <!-- 弹框 -->
    <dialog-component :show-dialog.sync="show" :title="title" @handleSubmit="handleSubmit">
      <template #form>
        <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
      </template>
    </dialog-component>
  </div>
</template>

<script>
import { addRole, editRoleInfo, getRoleInfo, getRoles, removeRole } from '@/api/settings'

export default {
  name: 'SettingsPage',
  components: {},
  directives: {},
  props: {},
  data() {
    return {
      params: {
        page: 1,
        pagesize: 5
      },
      total: 0,

      rows: [],

      show: false,

      isEdit: false,

      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title() {
      return this.isEdit ? '编辑角色' : '新增角色'
    }
  },
  watch: {},
  async created() {
    this.getRolesList()
  },
  mounted() {},
  activated() {},
  updated() {},
  methods: {
    // 编辑
    async handleEdit(id) {
      const { data } = await getRoleInfo(id)
      this.roleForm = data
      this.isEdit = true
      this.show = true
    },
    // 表单提交
    handleSubmit() {
      this.$refs.roleForm.validate(async valid => {
        if (valid) {
          // console.log(this.roleForm)

          try {
            await this.isEdit ? editRoleInfo(this.roleForm) : addRole(this.roleForm)

            // 刷新页面
            // console.log(this.total / this.params.pagesize)
            if (!this.isEdit) {
              this.total++
              this.params.page = Math.ceil(this.total / this.params.pagesize)
            }
            this.show = false
            this.roleForm = {}
            this.getRolesList()
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    // 新增角色
    handleAdd() {
      this.isEdit = false
      this.roleForm = {}
      this.show = true
    },
    // 删除角色
    async handleRemove(id) {
      try {
        await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        try {
          await removeRole(id)
          // this.$message.success('删除角色成功')
          // 2. 如果当前表格中只有一条，删除之后自动请求上一页数据
          if (this.rows.length === 1) {
            this.params.page--
            if (this.params.page <= 0) {
              this.params.page = 1
            }
          }
          // 重新请求
          this.getRolesList()
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        this.$message.info('取消操作')
      }
    },
    // 序号
    indexMethod(index) {
      return (this.params.page - 1) * this.params.pagesize + 1 + index
    },

    // 长度改变
    handleSizeChange(val) {
      this.params.pagesize = val
      this.getRolesList()
    },
    // 页数改变
    handleCurrentChange(val) {
      this.params.page = val
      this.getRolesList()
    },
    // 获取角色列表
    async getRolesList() {
      this.rows = []
      const {
        data: { total, rows }
      } = await getRoles(this.params)
      this.total = total
      this.rows = rows
    }
  }
}
</script>

<style scoped lang=""></style>
