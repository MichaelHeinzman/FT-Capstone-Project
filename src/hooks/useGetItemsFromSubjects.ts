import { useEffect, useState } from "react";
export function useGetItemsFromSubjects(subjects: any) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if (subjects) {
      const mappedTypes: any = [];
      Object.keys(subjects).map((key: string) => {
        mappedTypes.push({
          label: key,
          value: key,
        });
      });

      setItems(mappedTypes);
    }
  }, [subjects]);

  return {
    items,
    setItems,
  };
}
