import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic';

const ShouldIApply = () => {
  return (
    redirect('/should-i-apply/ownership')
  )
}

export default ShouldIApply