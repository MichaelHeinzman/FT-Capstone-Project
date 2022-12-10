import { useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";
export function useGetTypesFromSubject(subject: any) {
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    if (subject?.events) {
      const mappedTypes: any = [];
      Object.keys(subject.events).map((key: string) => {
        mappedTypes.push({
          label: key,
          value: key,
        });
      });

      setTypes(mappedTypes);
    }
  }, [subject]);

  return {
    types,
  };
}
