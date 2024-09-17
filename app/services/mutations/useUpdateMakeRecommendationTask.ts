import useSWRMutation from 'swr/mutation'
import { updateMakeRecommendation, uploadMakeRecommendationFile} from '../api/evaluation-service/updateMakeRecommendation'
import { APPLICATION_DOCUMENTS_ROUTE } from '@/app/constants/local-routes'

export function useUpdateMakeRecommendationTask() {

  return useSWRMutation(APPLICATION_DOCUMENTS_ROUTE, updateMakeRecommendation, {
    onSuccess: (data, key, config) => {
      console.log('POST successful:', data)
    },
    onError: (error) => {
      console.error('Failed to POST data:', error)
    },
  })
}

export function useUploadMakeRecommendationFileTask() {

  return useSWRMutation(APPLICATION_DOCUMENTS_ROUTE, uploadMakeRecommendationFile, {
    onSuccess: (data, key, config) => {
      console.log('POST successful:', data)
    },
    onError: (error) => {
      console.error('Failed to POST data:', error)
    },
  })
}
