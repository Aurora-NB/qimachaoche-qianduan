import request from '@/utils/request'
import FileSaver from 'file-saver'

export function submitAssignment(data) {
  return request({
    url: '/v1/client/submit/job/general',
    method: 'post',
    data
  })
}

export function submitAssignmentByFile(data) {
  return request({
    url: '/v1/client/submit/job/high',
    method: 'post',
    data
  })
}

export function downloadTempalte(path, fileName) {
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
