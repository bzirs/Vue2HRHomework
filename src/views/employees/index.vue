<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small" @click="$router.push('/import')">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="handleAdd">新增员工</el-button>
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

        <!-- dialog -->
        <dialog-component :show-dialog.sync="show" @handleSubmit="handleSubmit">
          <template v-if="show" #form>
            <!-- 表单 -->
            <el-form ref="empForm" :model="formData" :rules="rules" label-width="120px">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item label="手机" prop="mobile">
                <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
              </el-form-item>
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
              </el-form-item>
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
                  <el-option v-for="item in HireType" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>

              </el-form-item>
              <el-form-item label="工号" prop="workNumber">
                <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
              </el-form-item>
              <el-form-item label="部门" prop="departmentName">
                <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="handleTree" />
                <div v-if="treeShow" class="tree-box" style="width:50%">
                  <el-tree :data="treeData" :props="{ label: 'name' }" @node-click="hNodeClick" />
                </div>
              </el-form-item>
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
              </el-form-item>
            </el-form>
          </template>
        </dialog-component>
      </el-card>
    </div>
  </div>
</template>

<script>
import { handleTreeArray } from '@/utils'
import { getDepartmentsList } from '@/api/departments'
import { hireTypeList } from '@/constant'
import employees from '@/constant/employees'
import { addEmp, EmpDel, getEmpList } from '@/api/employees'
export default {
  name: 'EmployeesPage',
  data() {
    return {
      params: {
        page: 1,
        size: 2
      },

      emps: [],
      total: 0,

      show: false,

      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },

      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      },

      treeShow: false,
      treeData: []

    }
  },
  computed: {
    HireType() {
      // console.log(hireType)
      return employees.hireType
    }
  },

  async created() {
    this.loadEmpList()
    this.loadDepartments()
  },
  methods: {
    // 获取部门列表
    async loadDepartments() {
      const { data: { depts }} = await getDepartmentsList()
      depts.shift() // 去掉第一个元素（公司名）
      this.treeData = handleTreeArray(depts)
    },
    // 选择部门
    hNodeClick(node) {
      console.log(node)
      if (!node.children.length) {
        this.formData.departmentName = node.name
      }
    },
    // 表单提交
    handleSubmit() {
      this.$refs.empForm.validate(async valid => {
        if (valid) {
          await this.addEmpInfo()

          this.total++
          this.params.page = Math.ceil(this.total / this.params.size)

          this.loadEmpList()
        }
      })
    },

    // 新增员工
    async addEmpInfo() {
      try {
        await addEmp(this.formData)
        this.show = false
      } catch (error) {
        console.log(error)
      }
    },

    // 处理树状显示隐藏
    async handleTree() {
      this.treeShow = !this.treeShow
    },
    // 新增员工
    handleAdd() {
      // this.formData = {}
      this.show = true
      this.$refs.empForm?.clearValidate()
    },
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
