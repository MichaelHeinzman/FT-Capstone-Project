import { useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";
export function useGetTypesFromSubject(subjectTypes: any) {
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    if (subjectTypes) {
      const mappedTypes: any = [];
      Object.keys(subjectTypes).map((key: string) => {
        mappedTypes.push({
          label: key,
          value: key,
        });
      });

      setTypes(mappedTypes);
    }
  }, []);

  return {
    types,
  };
}
