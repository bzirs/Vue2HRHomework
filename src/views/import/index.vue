<template>
  <uploadExcelComponent :on-success="handleSuccess" />
</template>

<script>
import uploadExcelComponent from '@/components/UploadExcel'
import { formatExcelDate } from '@/utils'
import { batchAddEmps } from '@/api/employees'

export default {
  name: 'Import',
  components: { uploadExcelComponent },
  methods: {
    transExcel(results) {
      const mapInfo = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }
      return results.map(zhObj => {
        const enObj = {}
        const zhKeys = Object.keys(zhObj) // ['姓名', '手机号']

        zhKeys.forEach(zhKey => {
          const enKey = mapInfo[zhKey]

          if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            // 后端需要的日期格式是标准时间
            enObj[enKey] = new Date(formatExcelDate(zhObj[zhKey]))
          } else {
            enObj[enKey] = zhObj[zhKey]
          }
        })

        return enObj
      })
    },
    async handleSuccess({ header, results }) {
      // 上传
      const res = await batchAddEmps(this.transExcel(results))
      console.log(res)
      this.$message.success('导入成功')

      // 页面后退
      this.$router.back()
    }
  }
}
</script>
