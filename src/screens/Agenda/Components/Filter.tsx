import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Background from "../../../components/Background";
import DropDownPicker from "react-native-dropdown-picker";
import { useGetItemsFromSubjects } from "../../../hooks/useGetItemsFromSubjects";
import { useGetUserSubjects } from "../../../hooks/useGetUserSubjects";
type Props = {
  setFilter: React.Dispatch<any>;
  filter: any;
  closeFilter: any;
};

const Filter = ({ setFilter, filter, closeFilter }: Props) => {
  const [filterSubject, setFilterSubject] = useState("");
  const { subjects } = useGetUserSubjects();
  const { items, setItems } = useGetItemsFromSubjects(subjects);
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.filter}>
      <Background />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Filters</Text>
        <TouchableOpacity onPress={closeFilter}>
          <Text style={styles.headerText}>Save Filter</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Show Subjects Picked</Text>
        <DropDownPicker
          itemSeparator
          open={open}
          value={filter}
          items={items}
          loading={true}
          setOpen={setOpen}
          setValue={setFilter}
          setItems={setItems}
          multiple={true}
          style={styles.dropDown}
          listMode="SCROLLVIEW"
          placeholder="Select Subjects to filter"
          zIndex={3000}
          zIndexInverse={1000}
          theme="DARK"
          badgeDotColors={[
            "#e76f51",
            "#00b4d8",
            "#e9c46a",
            "#e76f51",
            "#8ac926",
            "#00b4d8",
            "#e9c46a",
          ]}
          mode="BADGE"
        />
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    color: "white",
  },
  filter: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    bottom: 0,
    top: 0,
  },
  content: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  dropDown: {
    width: "100%",
  },
  label: {
    fontSize: 20,
    color: "white",
    padding: 10,
  },
});
