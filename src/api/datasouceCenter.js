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
