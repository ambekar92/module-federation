import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function useIsReviewersDashboard() {
  const pathname = usePathname();
  const [isReviewersDashboard, setIsReviewersDashboard] = useState<boolean>(false);

  useEffect(() => {
    if (pathname) {
      const basePath = pathname.split('?')[0];
      setIsReviewersDashboard(basePath.endsWith('/user/dashboard/reviewers'));
    }
  }, [pathname]);

  return isReviewersDashboard;
}
