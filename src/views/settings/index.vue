<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" size="small" type="primary">新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="rows">
              <el-table-column label="序号" width="120" type="index" :index="indexMethod" />
              <el-table-column label="角色名称" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template v-slot="{ row: { id } }" width="200">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary">编辑</el-button>
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
  </div>
</template>

<script>
import { getRoles, removeRole } from '@/api/settings'

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

      rows: []
    }
  },
  computed: {},
  watch: {},
  async created() {
    this.getRolesList()
  },
  mounted() {},
  activated() {},
  updated() {},
  methods: {
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
