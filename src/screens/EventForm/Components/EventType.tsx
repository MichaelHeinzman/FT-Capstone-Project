import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import StyledButton from "../../../components/StyledButton";
import StyledTextInput from "../../../components/StyledTextInput";
import { addSubject } from "../../../firebase";
import { useGetUserSubjects } from "../../../hooks/useGetUserSubjects";
type Props = {
  setType: React.Dispatch<any>;
  subject: string;
};

const EventTypes = ({ setType, subject }: Props) => {
  const { subjects } = useGetUserSubjects();
  const [items, setItems] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(null);
  const [type, setNewType] = useState("");

  useEffect(() => {
    const events = subjects[subject]?.events || {};
    const mappedTypes: any = [];
    Object.keys(events).forEach((key: string) => {
      if (events[key] === type) setValue(key);
      mappedTypes.push({
        label: key,
        value: key,
      });
    });

    setItems(mappedTypes);
  }, []);

  useEffect(() => {
    if (value) setType(value);
  }, [value]);

  const handleAddANewSubject = () => {
    const temp = { ...subjects[subject] };
    temp.events = { ...temp.events, [type]: { averageTimeTook: 0 } };
    addSubject(temp);
    setValue(type);
  };
  return (
    <View style={styles.container}>
      <DropDownPicker
        searchable
        open={open}
        value={value}
        items={items}
        loading={true}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropDown}
        listMode="SCROLLVIEW"
        placeholder="Select a Type"
      />
      <View style={styles.input}>
        <StyledTextInput
          value={type}
          placeholder="Type Name Here"
          placeholderTextColor="grey"
          onChangeEvent={(v: string) => setNewType(v)}
          secureTextEntry={false}
          error={null}
          givenStyles={styles.input}
        />
      </View>
      <View style={styles.submitButton}>
        <StyledButton
          text="Create New Type"
          onPressEvent={handleAddANewSubject}
          textStyle={styles.submitButtonText}
        />
      </View>
    </View>
  );
};

export default EventTypes;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
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
  addSubjectButton: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E66E7",
  },

  input: {
    flex: 0.3,
    width: "100%",
  },

  submitButton: {
    flex: 0.2,
    width: "70%",
    margin: 10,
  },
  submitButtonText: {
    fontSize: 16,
  },
});
