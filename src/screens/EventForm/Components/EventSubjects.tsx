import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { useGetUserSubjects } from "../../../hooks/useGetUserSubjects";
import DropDownPicker from "react-native-dropdown-picker";
import StyledButton from "../../../components/StyledButton";
import StyledTextInput from "../../../components/StyledTextInput";
import { addSubject } from "../../../firebase";
type Props = {
  setSubject: React.Dispatch<any>;
};

const EventSubjects = ({ setSubject }: Props) => {
  const { subjectsArray: subjects } = useGetUserSubjects();
  const [items, setItems] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [subject, setNewSubject] = useState("");

  useEffect(() => {
    const mappedSubjects = subjects.map((item: any, i: number) => {
      if (item.id === subject) setValue(item.id);
      return {
        label: item.id,
        value: item.id,
      };
    });

    setItems(mappedSubjects);
  }, [subjects]);

  useEffect(() => {
    if (value) setSubject(value);
  }, [value]);

  const handleAddANewSubject = () => addSubject({ events: {}, name: subject });

  const renderListItem = (item: any) => {};
  return (
    <View style={styles.container}>
      <DropDownPicker
        searchable
        itemSeparator
        open={open}
        value={value}
        items={items}
        loading={true}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropDown}
        listMode="SCROLLVIEW"
        placeholder="Select a Subject"
        zIndex={3000}
        zIndexInverse={1000}
      />
      <StyledTextInput
        value={subject}
        placeholder="Type Name of New Subject"
        placeholderTextColor="grey"
        onChangeEvent={(v: string) => setNewSubject(v)}
        secureTextEntry={false}
        error={null}
        givenStyles={styles.input}
      />
      <StyledButton
        text="Create New Subject"
        onPressEvent={handleAddANewSubject}
        textStyle={styles.submitButtonText}
        buttonStyle={styles.submitButton}
      />
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
    zIndex: 3000,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  dropDown: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    width: "100%",
  },
  submitButton: {
    flex: 1,
    width: "70%",
    margin: 10,
  },
  submitButtonText: {
    fontSize: 16,
  },
});