import request from '@/utils/request'
import FileSaver from 'file-saver'

export function downloadTemplate(path, fileName) {
  request({
    url: '/v1/client/download/template',
    method: 'post',
    data: {
      file_name: path + '/' + fileName
    }
  }).then(f => {
    const jsonObj = f.data
    const jsonStr = JSON.stringify(jsonObj, null, '  ')
    const file = new Blob([jsonStr], { type: '' })
    FileSaver.saveAs(file, fileName)
  })
}

export function downloadTemplateByFullPath(fullPath) {
  request({
    url: '/v1/client/download/template',
    method: 'post',
    data: {
      file_name: fullPath
    }
  }).then(f => {
    const jsonObj = f.data
    const jsonStr = JSON.stringify(jsonObj, null, '  ')
    const file = new Blob([jsonStr], { type: '' })

    const reverseStr = fullPath.split('').reverse().join('')
    const fileName = reverseStr.slice(0, reverseStr.indexOf('/')).split('').reverse().join('')
    FileSaver.saveAs(file, fileName)
  })
}
