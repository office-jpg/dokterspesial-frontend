import React, { createContext, useContext, useMemo } from "react";

interface ServiceDetailContextType {
    serviceTypes: Array<{ id: number; name: string }>;
    getServiceTypeName: (id: number | undefined) => string;
    serviceCategories: Array<{ id: number; name: string }>;
    getServiceCategoryName: (id: number | undefined) => string;
}

const ServiceDetailContext = createContext<ServiceDetailContextType | undefined>(undefined);

interface ServiceDetailProviderProps {
    children: React.ReactNode;
    types: Array<{ id: number; name: string }>;
    categories: Array<{ id: number; name: string }>;
}

export function ServiceDetailProvider({ children, types, categories }: ServiceDetailProviderProps) {
    const fallbackTypeMapping = useMemo(
        () =>
            ({
                1: "Kedokteran Klinis",
                2: "Dosen & Akademisi",
                3: "Peneliti & Mahasiswa S2/S3",
                4: "Tenaga Kesehatan Lainnya",
            }) as const,
        []
    );

    const getServiceTypeName = (id: number | undefined): string => {
        if (!id) return "Tidak Diketahui";

        const type = types.find((t) => t.id === id);
        if (type) return type.name;

        return fallbackTypeMapping[id as keyof typeof fallbackTypeMapping] || "Tidak Diketahui";
    };

    const getServiceCategoryName = (id: number | undefined): string => {
        if (!id) return "Tidak Diketahui";

        const category = categories.find((c) => c.id === id);
        return category?.name || "Tidak Diketahui";
    };

    const value = {
        serviceTypes: types,
        getServiceTypeName,
        serviceCategories: categories,
        getServiceCategoryName,
    };

    return (
        <ServiceDetailContext.Provider value={value}>
            {children}
        </ServiceDetailContext.Provider>
    );
}

export function useServiceDetailTypes() {
    const context = useContext(ServiceDetailContext);
    if (!context) {
        throw new Error("useServiceDetailTypes must be used within a ServiceDetailProvider");
    }
    return context;
}
