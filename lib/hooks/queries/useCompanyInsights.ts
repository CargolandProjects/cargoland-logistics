import { company } from "@/lib/services/company.service";
import { useQuery } from "@tanstack/react-query";

export const useCompanyInsight = () => {
  return useQuery({
    queryKey: ["company-insights"],
    queryFn: company.getCompanyInsights,
  });
};
