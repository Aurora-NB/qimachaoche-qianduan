import request from '@/utils/request'

export function getDatasourceManagementList() {
  return request({
    url: '/v1/preprocess/data/list?data_type=0',
    method: 'get'
  })
}

export function getDatasourcePreprocessList() {
  return request({
    url: '/v1/preprocess/data/list?data_type=1',
    method: 'get'
  })
}

export function delDatasource(jobId) {
  const data = new FormData()
  data.append('job_id', jobId)
  return request({
    url: '/v1/preprocess/data/del',
    method: 'POST',
    data
  })
}

export function uploadDatasource(data) {
  return request({
    url: '/v1/client/upload',
    method: 'POST',
    data
  })
}

export function getPreprocessingField(fullPath) {
  return request({
    url: '/v1/client/download/template',
    method: 'post',
    data: {
      file_name: fullPath
    }
  })
    .then(res => {
      return Promise.resolve(
        res.data
          .split('\r\n')[0]
          .split(',')
          .map(item => ({
            label: item,
            description: '',
            type: 0,
            is_use: true,
            content: ''
          }))
      )
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export function preprocess(data) {
  return request({
    url: '/v1/preprocess/data/preprocess',
    method: 'post',
    data
  })
}
