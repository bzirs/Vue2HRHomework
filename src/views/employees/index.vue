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
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">分配角色</el-button>
              <el-button type="text" size="small">删除</el-button>
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
      </el-card>
    </div>
  </div>
</template>

<script>

import { hireTypeList } from '@/constant'
import { getEmpList } from '@/api/employees'
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
    // 聘用形式
    hireType(t) {
      return hireTypeList[t] || '不知道'
    },
    // 分页页数改变
    handleCurrentChange(v) {
      console.log(v)
    },
    // 分页长度改变
    handleSizeChange(v) {
      console.log(v)
    },
    // 索引
    Index(index) {
      return (this.params.page - 1) * this.params.size + 1 + index
    },
    // 获取员工列表
    async loadEmpList() {
      const { data: { rows, total }} = await getEmpList(this.params)

      this.emps = rows
      this.total = total
    }

  }
}
</script>
