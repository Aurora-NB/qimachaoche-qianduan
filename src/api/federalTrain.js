import request from '@/utils/request'

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

