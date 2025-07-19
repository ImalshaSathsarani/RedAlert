
import {  createContext, useContext, useState, ReactNode } from "react";


type EligibilityContextType = {
    formData: Record<string, any>;
    updateFormData: (field: string, value: any) => void;
};

const EligibilityContext = createContext<EligibilityContextType | null>(null);


export const EligibilityProvider = ({ children }: { children: ReactNode }) => {
    const [formData, setFormData] = useState({});

const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
};

return (
    <EligibilityContext.Provider value={{ formData, updateFormData }}>
        {children}
    </EligibilityContext.Provider>
);
}

export const useEligibility = () => useContext(EligibilityContext);