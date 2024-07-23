import { redirect } from 'next/navigation'

const ShouldIApply = () => {
  return (
    redirect('/should-i-apply/ownership')
  )
}

export default ShouldIApply