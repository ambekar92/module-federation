import { useEffect, useState } from 'react'
import { isInApplicationFlow } from '../utils'
import { usePathname } from 'next/navigation';

export function useSelectedNavItem() {
  const [selectedNameId, setSelectedNameId] = useState('');
  const path = usePathname();

  function updateSelectedNameId(navItemName: string) {
    setSelectedNameId(navItemName)
  }

  useEffect(() => {
    switch (true) {
      case isInApplicationFlow():
        setSelectedNameId('Home')
        break
      case path === '/my-tasks':
        setSelectedNameId('My Tasks')
        break
      case path === '/team':
        setSelectedNameId('Team')
        break
      case path === '/team-tasks':
        setSelectedNameId('Team Tasks')
        break
      case path === '/saved':
        setSelectedNameId('Saved')
        break
      case path === '/support':
        setSelectedNameId('Support')
        break
      case path === '/admin/configuration':
        setSelectedNameId('System Configuration')
        break
      case path === '/entities':
        setSelectedNameId('Entities')
        break
      case path === '/users':
        setSelectedNameId('Users')
        break
      case path === '/messages':
        setSelectedNameId('Messages')
        break
      case path === '/documents':
        setSelectedNameId('Documents')
        break
      case path === '/should-i-apply/ownership':
        setSelectedNameId('Should I Apply?')
        break
      case path === '/application':
        setSelectedNameId('Application Prep')
        break
      case path === '/calculator':
        setSelectedNameId('HUBZone Calculator')
        break
      case path === 'https://certification.sba.gov':
        setSelectedNameId('Home')
        break
      default:
        setSelectedNameId('')
    }
  }, [path]);

  return {selectedNameId, updateSelectedNameId}
}
