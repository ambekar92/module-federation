import { useEffect, useState } from 'react';

export type OperatorType = {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  principalType: string;
  licenseHolder: string;
};

export type OperatorApplicationInfo = {
  operators: OperatorType[];
};

export const useOperatorApplicationInfo = () => {
  const [operatorApplicationInfo, setOperatorApplicationInfo] = useState<OperatorApplicationInfo>({
    operators: [],
  });

  useEffect(() => {
    const storedInfo = localStorage.getItem('operatorApplicationInfo');
    if (storedInfo) {
      setOperatorApplicationInfo(JSON.parse(storedInfo));
    }
  }, []);

  const updateOperatorApplicationInfo = (updatedInfo: Partial<OperatorApplicationInfo>) => {
    const newInfo = { ...operatorApplicationInfo, ...updatedInfo };
    setOperatorApplicationInfo(newInfo);
    localStorage.setItem('operatorApplicationInfo', JSON.stringify(newInfo));
    return newInfo;
  };

  const addOperator = (operator: OperatorType) => {
    const newOperators = [...operatorApplicationInfo.operators, operator];
    updateOperatorApplicationInfo({
      operators: newOperators,
    });
  };

  const removeOperator = (index: number) => {
    const newOperators = operatorApplicationInfo.operators.filter((_, i) => i !== index);
    updateOperatorApplicationInfo({
      operators: newOperators,
    });
  };

  return {
    operatorApplicationInfo,
    updateOperatorApplicationInfo,
    addOperator,
    removeOperator,
  };
};
