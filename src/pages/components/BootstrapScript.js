// components/BootstrapScript.js

import { useEffect } from 'react';

const BootstrapScript = () => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null; // This component does not render anything
};

export default BootstrapScript;
