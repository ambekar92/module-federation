import { MAKE_RECOMMENDATION_ROUTE, GET_DOCUMENTS } from '@/app/constants/routes'
import useSWRMutation from 'swr/mutation'
import { updateMakeRecommendation, uploadMakeRecommendationFile} from '../api/evaluation-service/updateMakeRecommendation'

export function useUpdateMakeRecommendationTask() {

  return useSWRMutation(MAKE_RECOMMENDATION_ROUTE, updateMakeRecommendation, {
    onSuccess: (data, key, config) => {
      console.log('POST successful:', data)
    },
    onError: (error) => {
      console.error('Failed to POST data:', error)
    },
  })
}

export function useUploadMakeRecommendationFileTask() {

  return useSWRMutation(GET_DOCUMENTS, uploadMakeRecommendationFile, {
    onSuccess: (data, key, config) => {
      console.log('POST successful:', data)
    },
    onError: (error) => {
      console.error('Failed to POST data:', error)
    },
  })
}
