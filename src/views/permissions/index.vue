<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="hAdd(1,'0')">添加权限</el-button>
        </div>
        <el-table border :data="list" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <!-- <template slot-scope="scope">-->
            <template #default="{ row }">
              <!-- type为1时为页面级访问权限，它可以继续做添加： 设置页面下边某个功能是否可以操作 -->
              <!-- type为2时为按钮级别的访问权限，它就不能再继续细分了，它就没有添加了 -->
              <el-button v-if="row.type === 1" type="text" @click="hAdd(2,row.id)">添加</el-button>
              <el-button type="text" @click="hEdit(row.id)">编辑</el-button>
              <el-button type="text" @click="hDel(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- dialog -->
      <dialog-component :show-dialog.sync="show" @handleSubmit="handleSubmit">
        <template #form>
          <!-- 表单内容 -->
          <el-form label-width="100px">
            <el-form-item label="权限名称">
              <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="权限标识">
              <el-input v-model="formData.code" />
            </el-form-item>
            <el-form-item label="权限描述">
              <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item label="权限启用">
              <el-switch
                v-model="formData.enVisible"
                active-text="启用"
                active-value="1"
                inactive-text="不启用"
                inactive-value="0"
              />
            </el-form-item>
          </el-form>
        </template>
      </dialog-component>
    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission, delPermission, updatePermission, getPermissionDetail } from '@/api/permissions'
import { handleTreeArray } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      list: [],
      show: false,
      formData: {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      },
      isEdit: false
    }
  },
  created() {
    this.loadPermissionList()
  },
  methods: {
    // 编辑
    // 用户点击了编辑
    async hEdit(id) {
      this.isEdit = true
      // alert(id)
      // 1. 根据id去获取详情
      const res = await getPermissionDetail(id)
      console.log('从后端返回的权限点详情数据是', res)
      // 2. 填充在表单中
      this.formData = res.data
      // 3. 显示弹层
      this.show = true
    },
    async doEdit() {
      try {
        const res = await updatePermission(this.formData)
        console.log(res)

        this.showDialog = false
        this.loadPermissionList()
        this.$message.success('修改成功')
      } catch (err) {
        console.log(err)
        this.$message.error('修改失败')
      }
    },
    // 删除权限
    async doDel(id) {
      try {
        const res = await delPermission(id)
        console.log(res)

        this.loadPermissionList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
        this.$message.error('删除失败')
      }
    },
    // 用户点击删除
    hDel(id) {
    // alert(id)
      this.$confirm('你确定要删除吗？').then(() => {
        this.doDel(id)
      }).catch(() => {

      })
    },
    // 添加
    async doAdd() {
      try {
        const res = await addPermission(this.formData)
        console.log(res)

        this.showDialog = false
        this.loadPermissionList()
        this.$message.success('添加成功')
      } catch (err) {
        console.log(err)
        this.$message.error('添加失败')
      }
    },
    // 添加权限
    hAdd(type, id) {
      this.isEdit = false
      this.formData = {
        name: '', // 名称
        code: '', // 权限标识
        description: '', // 描述
        enVisible: '0', // 开启
        pid: '', // 添加到哪个节点下
        type: '' // 类型
      }
      this.show = true
      // 记录当前添加的关键信息
      this.formData.type = type
      this.formData.pid = id
    },
    async loadPermissionList() {
      const res = await getPermissionList()
      // console.log('从后端获取的数据的是', res)

      this.list = handleTreeArray(res.data)
    },
    // 表单提交
    handleSubmit() {
      this.isEdit ? this.doEdit() : this.doAdd()
      this.show = false
      this.loadPermissionList()
    }
  }
}
</script>
