import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useGetUserSubjects } from "../../../hooks/useGetUserSubjects";
import DropDownPicker from "react-native-dropdown-picker";
type Props = {};

const EventSubjects = (props: Props) => {
  const { subjectsArray } = useGetUserSubjects();
  const [items, setItems] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  useEffect(() => {
    const mappedSubjects = subjectsArray.map((item: any, i: number) => {
      return {
        label: item.id,
        value: item.id,
      };
    });

    setItems(mappedSubjects);
  }, []);

  return (
    <View style={styles.container}>
      <DropDownPicker
        searchable={true}
        addCustomItem={true}
        searchPlaceholder="Search"
        loading={subjectsArray}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={true}
        style={styles.dropDown}
        listMode="SCROLLVIEW"
        placeholder="Select a Subject"
        itemSeparator={true}
      />
      <TouchableOpacity style={styles.addSubjectButton}>
        <Text>Add a Subject</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventSubjects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDown: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  addSubjectButton: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E66E7",
  },
});
