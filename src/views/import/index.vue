<template>
  <uploadExcelComponent />
</template>

<script>
import uploadExcelComponent from '@/components/UploadExcel'

export default {
  name: 'Import',
  components: { uploadExcelComponent },
  methods: {
    handleSuccess({ header, results }) {
      console.log(header, results)
    }
  }
}
</script>
