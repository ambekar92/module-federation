import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useCurrentPath() {
  const pathname = usePathname();
  const [state, setState] = useState({
    isReviewersDashboard: false,
    isTasksDashboard: false,
  });

  useEffect(() => {
    if (pathname) {
      const basePath = pathname.split('?')[0];
      setState({
        isReviewersDashboard: basePath.endsWith('/user/dashboard/reviewers'),
        isTasksDashboard: basePath.endsWith('/user/dashboard/tasks'),
      });
    }
  }, [pathname]);

  return state;
}
