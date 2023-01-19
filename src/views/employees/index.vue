<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </page-tools>

      <el-card style="margin-top: 10px;">
        <el-table border :data="emps">
          <el-table-column label="序号" type="index" :index="Index" />
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="工号" prop="workNumber" />
          <el-table-column label="聘用形式">
            <template v-slot="{row:{formOfEmployment}}">
              {{ hireType(formOfEmployment) }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" />
          <el-table-column label="操作" width="280">
            <template v-slot="{row:{id}}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small" @click="handleRemove(id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <!-- 分页组件 -->
          <el-pagination
            :current-page="params.page"
            :page-sizes="[2, 5, 10, 20]"
            :page-size="params.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>

import { hireTypeList } from '@/constant'
import { EmpDel, getEmpList } from '@/api/employees'
export default {
  name: 'EmployeesPage',
  data() {
    return {
      params: {
        page: 1,
        size: 2
      },

      emps: [],
      total: 0

    }
  },

  created() {
    this.loadEmpList()
  },
  methods: {
    // 删除员工
    async handleRemove(id) {
      try {
        await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        try {
          await EmpDel(id)
          // this.$message.success('删除角色成功')
          // 2. 如果当前表格中只有一条，删除之后自动请求上一页数据
          if (this.emps.length === 1) {
            this.params.page--
            if (this.params.page <= 0) {
              this.params.page = 1
            }
          }
          // 重新请求
          this.loadEmpList()
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        this.$message.info('取消操作')
      }
    },
    // 聘用形式
    hireType(t) {
      return hireTypeList[t] || '不知道'
    },
    // 分页页数改变
    handleCurrentChange(v) {
      this.params.page = v
      this.loadEmpList()
    },
    // 分页长度改变
    handleSizeChange(v) {
      this.params.size = v
      this.loadEmpList()
    },
    // 索引
    Index(index) {
      return (this.params.page - 1) * this.params.size + 1 + index
    },
    // 获取员工列表
    async loadEmpList() {
      this.emps = []

      const { data: { rows, total }} = await getEmpList(this.params)

      this.emps = rows
      this.total = total
    }

  }
}
</script>
